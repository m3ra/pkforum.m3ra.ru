const crypto = require('crypto');
const express = require('express');
const functions = require('firebase-functions');
const https = require('https');
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
    domain: functions.config().mailgun.domain,
    host: functions.config().mailgun.host
  });

  const list = mailgun.lists(functions.config().mailgun.list);
  return list.members(email).info((err, body) => {
    if (!err) { // Member already exists in mailing list.
      return https.get(functions.config().data.onboard, (result) => {
        result.on('data', (s) => {
          console.log(s);
          const tplData = JSON.parse(s);
          const data = {
            from: functions.config().mailgun.from,
            to: email,
            subject: functions.config().subject.onboard,
            template: functions.config().template.onboard,
            'v:title': tplData.title,
            'v:start_time': tplData.start_time
          };
          mailgun.messages().send(data, (err, body) => {
            if (err) {
              console.error(err);
              return res.redirect(functions.config().url.error);
            }
            console.log(body);
            return res.redirect(functions.config().url.onboard);
          });
        });
      }).on('error', (e) => {
        console.error(e);
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

      return mailgun.messages().send(data, (err, body) => {
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
    return https.get(functions.config().data.onboard, (result) => {
      result.on('data', (s) => {
        console.log(s);
        const tplData = JSON.parse(s);
        const data = {
          from: functions.config().mailgun.from,
          to: email,
          subject: functions.config().subject.onboard,
          template: functions.config().template.onboard,
          'v:title': tplData.title,
          'v:start_time': tplData.start_time
        };
        mailgun.messages().send(data, (err, body) => {
          if (err) {
            console.error(err);
            return res.redirect(functions.config().url.error);
          }
          console.log(body);
          return res.redirect(functions.config().url.onboard);
        });
      });
    }).on('error', (e) => {
      console.error(e);
    });
  });
});

exports.app = functions.https.onRequest(app);
