var Utils = {

    pad : function(s, l, c) {
        var r = "", d = l - (typeof(s)=='string'? s : ""+s ).length;
        while(d-->0) r+=c;
        return r+s;
    },

    sprintf : function( fs, args ) {
        var s = new String(fs);
        for(var arg in args) {
            var regexp = new RegExp('\\{'+arg+'\\}', 'gi');
            s = s.replace(regexp, args[arg]);
        }
        return s;
    },


    copyTo : function(options) {
        options = options || {};
        var from = options.from || {},
            to = options.to || {},
            exclusions = options.exclusions || {_id:true},
            overwrite = options.overwrite || false;
        for (var k in from) {
            var v = from[k];
            if (!(v == "" || exclusions[k]) && !(to[k] || overwrite)) {
                to[k] = v;
            }
        }
        return to;
    },

    followPath : function(o,path) {
        var parts = path.split(".");
        var oc = o;
        for(var i=0;i<parts.length && oc!=null;i++) {
            oc = oc[parts[i]];
        }
        return oc;
    },


    loadDelimitedFile : function(dbName, collection, type, file, keepBlanks) {
        if(keepBlanks) run("mongoimport", "--headerline", "--type", type, "--db", dbName, "--collection", collection, "--file", file);
        else run("mongoimport", "--headerline", "--ignoreBlanks", "--type", type, "--db", dbName, "--collection", collection, "--file", file);
    },

    loadDocumentFile : function(collection, file) {
        var jsonString = cat(file);
        var linejson = jsonString.replace(/\s+/g,' ');
        var json = db.eval(linejson);
        collection.insert(json);
        return json;
    }

};
db.system.js.save( { _id : "copyTo" , value : Utils.copyTo} );
db.system.js.save( { _id : "followPath" , value : Utils.followPath} );
