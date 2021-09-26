FROM node:lts-alpine
RUN npm install -g firebase-tools
ENTRYPOINT ["/usr/local/bin/firebase"]
