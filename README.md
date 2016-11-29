# SoundRedux

### This was forked from [sound-redux](https://github.com/andrewngu/sound-redux)

In an effort to learn es6 and [redux](https://github.com/rackt/redux), this is SoundRedux, a simple [Soundcloud](http://soundcloud.com) client

See it in action at https://soundredux.io

Uses [normalizr](https://github.com/gaearon/normalizr)

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### Local authentication server setup

To see user authentication in action in your local environment, install and run the server.

The first way is to use [Go](https://golang.org/), please [see](https://github.com/andrewngu/sound-redux#install-local-server). But i wrote a simple script to do this.

```
# run a proxy server for authentication
npm run auth
```

Feedback, issues, etc. are more than welcome!
