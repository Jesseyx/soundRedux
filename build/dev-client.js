/* eslint-disable */
// see https://github.com/gaearon/react-hot-loader/tree/next-docs/docs
require('react-hot-loader/patch');
require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
