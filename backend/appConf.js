
var meConf = null;
try{
    meConf = require("../conf/dev/meConf");
}catch( e ) { console.log("meConf does not exist. ignoring.. ")}

var appConf = require("../app/scripts/appConf");


for ( var i in appConf ){
    exports[i] = appConf[i];
}

try{
if ( meConf != null ){
    for ( var i in meConf ){
        exports[i] = meConf[i];
    }
}
}catch(e){ console.log(["unable to merge meConf with appConf",e]);}

console.log(["this is appConf", appConf]);
return exports;


