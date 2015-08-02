var Firebase = require('firebase');

var syncfire = require('../../index.js');

syncfire.globalConfig({ ref: new Firebase('https://brilliant-inferno-4121.firebaseio.com/resync') })

var myRel = new syncfire.Relationship({}, 'flow-chat/rooms/__ROOMID__', 'me/woo/__ROOMID__/info');

myRel.sync(['a', 'b', 'c'])