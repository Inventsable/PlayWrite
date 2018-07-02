(function () {
  'use strict';

  var name = appInfo.name;

  // var ADOM = {
  //   data: "none"
  //   }
  //
  // ADOM.app = function(){
  //   // return function(){
  //     this.name = "Adobe Illustrator";
  //     this.activeDocument = "app.activeDocument";
  //     // }
  //   }

    const ADOM = {};

    Object.defineProperty(ADOM, 'app', {
       value : "some",
       writable : true,
       enumerable : true,
       configurable : true
     });

     // ADOM.app[]

  // console.log(ADOM.app);
  // console.log(ADOM.app.name);

// stuff = function (thing, callback) {
//   var inputs  = app.map(function(){
//     var key   = this.attr('name')
//      ,  value = this.attr('value')
//      ,  ret   = {};
//
//      ret[key] = value;
//      return ret;
//   })
//
//   callback(null, inputs);
// }





  //
  // switch(name){
  //   case 'ILST':
  //   activeDocument: "app.activeDocument",
  //   name: "app.name",
  //   parent: "app.parent",
  //   path: "app.path"
  //   break;


}());
