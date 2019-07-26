# pkforum.m3ra.ru

## Configuration

```
firebase functions:config:set \
    mailgun.apikey="MAILGUN_API_KEY" \
    mailgun.domain="YOUR_DOMAIN_NAME" \
    mailgun.from="Your Name <your@email.com>" \
    subject.confirm="Subject for Confirmation Message" \
    subject.success="subject for Success Message" \
    template.confirm="template.confirm" \
    template.success="template.success" \
    url.confirm="https://example.com/confirm" \
    url.success="https://example.com/success" \
    url.error="https://example.com/error" \
    hash.salt="some random string"
```
