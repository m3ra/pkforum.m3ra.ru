# pkforum.m3ra.ru

## Configuration

```
firebase functions:config:set \
    mailgun.apikey="MAILGUN_API_KEY" \
    mailgun.domain="YOUR_DOMAIN_NAME" \
    mailgun.host="api.eu.mailgun.net" \
    mailgun.from="Your Name <your@email.com>" \
    mailgun.list="mylist@mydomain.com" \
    subject.confirm="Subject for Confirmation Message" \
    subject.onboard="Welcome" \
    template.confirm="template.confirm" \
    template.onboard="template.onboard" \
    url.confirm="https://example.com/confirm" \
    url.onboard="https://example.com/onboard" \
    url.error="https://example.com/error" \
    hash.salt="some random string"
```
