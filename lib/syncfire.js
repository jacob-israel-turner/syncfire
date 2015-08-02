
/*
import { globalConfig, Relationship } from 'syncfire';

let a = '/users/__UID__/info/posts'
let b = '/posts/__UID__/'



let postRelationships = new Relationship(a, b, fields)

let fields = ['name', 'title', 'likes'];

postRelationships.sync(fields);
*/

import Firebase from 'firebase';
let rootRef;


export let globalConfig = _globalConfig;

function _globalConfig(obj){
  rootRef = obj.ref;
}

export let Relationship = _Relationship;

_Relationship.prototype.sync = _sync

function _Relationship(){
  /*
  config: {
    ref: fbref
  }
  */
  let config = Array.prototype.splice.call(arguments, 0, 1);
  let vars = new Set();
  let endpoints = Array.prototype.map.call(arguments, (endpoint) => {
    let temp = _splitEm(endpoint, config.ref)
    temp.vars.forEach((item) => vars.add(item));
    return temp.points;
  });
  this.endpoints = [];
  this.vars = vars;
  endpoints.forEach((item, index) => {
    this.endpoints.push(item);
  })
}

function _splitEm(endpoint, ref = rootRef){
  let points = endpoint.split('__');
  let tempArr = [];
  let vars = []
  points.forEach((point, index) => {
    if(index % 2) {
      tempArr.push(new All(point));
      vars.push(point)
    }
    else if (point) tempArr.push(ref.child(point));
  })
  return {
    points: tempArr,
    vars: vars
  };
}

function All(key){
  this.all = key;
}

function _sync(fields){
  let vars = {};
  this.listeners = [];
  let keys = this.endpoints.forEach(_getKeys);
  return keys;
}

function _getKeys(refArr, endpointIndex){
  refArr.forEach((pathPartial, refArrIndex) => {
    let refArrKeys = new Set()
    if(pathPartial instanceof All) return;
    pathPartial.on('value', (snapshot) => {
      let val = snapshot.val();
      if(!val) return;
      let keys = Object.keys(snapshot.val());
      keys.forEach((key) => refArrKeys.add(key));
      console.log(refArrKeys);
    })
  })
}







