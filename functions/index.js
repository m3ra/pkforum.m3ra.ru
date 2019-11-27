const crypto = require('crypto');
const functions = require('firebase-functions');
const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();

app.get('/a/health', (req, res) => {
  res.send('OK');
});

app.post('/a/signup', [check('email').isEmail()], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.redirect(functions.config().url.error);
  }

  const email = req.body.email;
  const mailgun = require('mailgun-js')({
    apiKey: functions.config().mailgun.apikey,
    domain: functions.config().mailgun.domain
  });

  const list = mailgun.lists(functions.config().mailgun.list);
  return list.members(email).info((err, body) => {
    if (!err) { // Member already exists in mailing list.
      const data = {
        from: functions.config().mailgun.from,
        to: email,
        subject: functions.config().subject.onboard,
        template: functions.config().template.onboard,
      };

      mailgun.messages().send(data, (err, body) => {
        if (err) {
          console.log(err);
          return res.redirect(functions.config().url.error);
        }
        console.log(body);
        return res.redirect(functions.config().url.onboard);
      });
    } else {
      const hmac = crypto.createHmac('sha256', functions.config().hash.salt);
      const digest = hmac.update(email).digest('hex');

      const data = {
        from: functions.config().mailgun.from,
        to: email,
        subject: functions.config().subject.confirm,
        template: functions.config().template.confirm,
        'v:email': encodeURIComponent(email),
        'v:hash': encodeURIComponent(digest)
      };

      mailgun.messages().send(data, (err, body) => {
        if (err) {
          console.log(err);
          return res.redirect(functions.config().url.error);
        }
        console.log(body);
        return res.redirect(functions.config().url.confirm);
      });
    }
  });
});

app.get('/a/confirm', (req, res) => {
  const email = req.query.e;
  const hmac = crypto.createHmac('sha256', functions.config().hash.salt);
  const digest = hmac.update(email).digest('hex');

  if (req.query.h !== digest) {
    return res.redirect(functions.config().url.error);
  }

  const mailgun = require('mailgun-js')({
    apiKey: functions.config().mailgun.apikey,
    domain: functions.config().mailgun.domain
  });

  const list = mailgun.lists(functions.config().mailgun.list);
  const data = {
    subscribed: true,
    address: email
  };

  return list.members().create(data, (err, body) => {
    if (err) {
      console.log(err);
      return res.redirect(functions.config().url.error);
    }

    console.log(body);
    const data = {
      from: functions.config().mailgun.from,
      to: email,
      subject: functions.config().subject.onboard,
      template: functions.config().template.onboard,
      'v:email': encodeURIComponent(email)
    };

    return mailgun.messages().send(data, (err, body) => {
      if (err) {
        console.log(err);
        return res.redirect(functions.config().url.error);
      }
      console.log(body);
      return res.redirect(functions.config().url.onboard);
    });
  });
});

exports.app = functions.https.onRequest(app);
