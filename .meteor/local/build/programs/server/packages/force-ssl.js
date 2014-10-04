(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var _ = Package.underscore._;
var DDP = Package.livedata.DDP;
var DDPServer = Package.livedata.DDPServer;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/force-ssl/force_ssl_common.js                                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
_.extend(Meteor.absoluteUrl.defaultOptions, {secure: true});                                            // 1
                                                                                                        // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/force-ssl/force_ssl_server.js                                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
// Unfortunately we can't use a connect middleware here since                                           // 1
// sockjs installs itself prior to all existing listeners                                               // 2
// (meaning prior to any connect middlewares) so we need to take                                        // 3
// an approach similar to overshadowListeners in                                                        // 4
// https://github.com/sockjs/sockjs-node/blob/cf820c55af6a9953e16558555a31decea554f70e/src/utils.coffee // 5
                                                                                                        // 6
var httpServer = WebApp.httpServer;                                                                     // 7
var oldHttpServerListeners = httpServer.listeners('request').slice(0);                                  // 8
httpServer.removeAllListeners('request');                                                               // 9
httpServer.addListener('request', function (req, res) {                                                 // 10
                                                                                                        // 11
  // allow connections if they have been handled w/ ssl already                                         // 12
  // (either by us or by a proxy) OR the connection is entirely over                                    // 13
  // localhost (development mode).                                                                      // 14
  //                                                                                                    // 15
  // Note: someone could trick us into serving over non-ssl by setting                                  // 16
  // x-forwarded-for or x-forwarded-proto. Not much we can do there if                                  // 17
  // we still want to operate behind proxies.                                                           // 18
                                                                                                        // 19
  var remoteAddress =                                                                                   // 20
        req.connection.remoteAddress || req.socket.remoteAddress;                                       // 21
  // Determine if the connection is only over localhost. Both we                                        // 22
  // received it on localhost, and all proxies involved received on                                     // 23
  // localhost.                                                                                         // 24
  var localhostRegexp = /^\s*(127\.0\.0\.1|::1)\s*$/;                                                   // 25
  var isLocal = (                                                                                       // 26
    localhostRegexp.test(remoteAddress) &&                                                              // 27
      (!req.headers['x-forwarded-for'] ||                                                               // 28
       _.all(req.headers['x-forwarded-for'].split(','), function (x) {                                  // 29
         return localhostRegexp.test(x);                                                                // 30
       })));                                                                                            // 31
                                                                                                        // 32
  // Determine if the connection was over SSL at any point. Either we                                   // 33
  // received it as SSL, or a proxy did and translated it for us.                                       // 34
  var isSsl = req.connection.pair ||                                                                    // 35
      (req.headers['x-forwarded-proto'] &&                                                              // 36
       req.headers['x-forwarded-proto'].indexOf('https') !== -1);                                       // 37
                                                                                                        // 38
  if (!isLocal && !isSsl) {                                                                             // 39
    // connection is not cool. send a 302 redirect!                                                     // 40
                                                                                                        // 41
    // if we don't have a host header, there's not a lot we can do. We                                  // 42
    // don't know how to redirect them.                                                                 // 43
    // XXX can we do better here?                                                                       // 44
    var host = req.headers.host || 'no-host-header';                                                    // 45
                                                                                                        // 46
    // strip off the port number. If we went to a URL with a custom                                     // 47
    // port, we don't know what the custom SSL port is anyway.                                          // 48
    host = host.replace(/:\d+$/, '');                                                                   // 49
                                                                                                        // 50
    res.writeHead(302, {                                                                                // 51
      'Location': 'https://' + host + req.url                                                           // 52
    });                                                                                                 // 53
    res.end();                                                                                          // 54
    return;                                                                                             // 55
  }                                                                                                     // 56
                                                                                                        // 57
  // connection is OK. Proceed normally.                                                                // 58
  var args = arguments;                                                                                 // 59
  _.each(oldHttpServerListeners, function(oldListener) {                                                // 60
    oldListener.apply(httpServer, args);                                                                // 61
  });                                                                                                   // 62
});                                                                                                     // 63
                                                                                                        // 64
                                                                                                        // 65
// NOTE: this doesn't handle websockets!                                                                // 66
//                                                                                                      // 67
// Websockets come in via the 'upgrade' request. We can override this,                                  // 68
// however the problem is we're not sure if the websocket is actually                                   // 69
// encrypted. We don't get x-forwarded-for or x-forwarded-proto on                                      // 70
// websockets. It's possible the 'sec-websocket-origin' header does                                     // 71
// what we want, but that's not clear.                                                                  // 72
//                                                                                                      // 73
// For now, this package allows raw unencrypted DDP connections over                                    // 74
// websockets.                                                                                          // 75
                                                                                                        // 76
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['force-ssl'] = {};

})();
