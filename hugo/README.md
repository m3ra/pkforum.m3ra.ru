# Hugo

This directory contains the site content and also all the configurations to
build and deploy the site to Firebase Hosting.

The build configuration file `cloudbuild.yaml` consists of the folowing steps:

1. Build the latest version of [Hugo](https://gohugo.io) using the
   `hugo.Dockerfile`.
2. Build the latest version of [Firbase
   CLI](https://firebase.google.com/docs/cli) using the `firebase.Dockerifle`.
3. Build the website using Hugo and deploy it to Firebase Hosting.

**NOTE:** All of the builds utilize Kaniko cache to decrease the build time. By
*default Kaniko executor uses _two weeks_ as the cache timeout.
