# vue-webpack-simple-rendering

> Vue Server Side Rendreing on Cloud Functions for Firebase Example

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev # SPA, no SSR

# build for production with minification
npm run build

# start firebase server
# create project from https://console.firebase.google.com
npm install -g firebase-cli
firebase use ${project_id}
pushd functions && npm install && popd
npm run serve
```