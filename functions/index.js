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
    return res.status(422).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const mailgun = require('mailgun-js')({
    apiKey: functions.config().mailgun.apikey,
    domain: functions.config().mailgun.domain
  });

  const hash = crypto.createHash('sha256');
  hash.update(email + functions.config().hash.salt);

  const data = {
    from: functions.config().mailgun.from,
    to: email,
    subject: functions.config().subject.confirm,
    template: functions.config().template.confirm,
    'v:email': email,
    'v:hash': hash.digest('hex')
  };

  mailgun.messages().send(data, (err, body) => {
    console.log(err, body);
    return res.redirect(functions.config().url.confirm);
  });

  return null;
});

exports.app = functions.https.onRequest(app);
