var Logger = function(){

    var formatRecord = this.formatRecord = function(d, l, msg){
        var s = [d,l,msg].join(" ");
        print(s);
    };
    var pad = Utils.pad;
    var sprintf = Utils.sprintf;

    this.ERROR = 0, this.WARNING = 1, this.INFO = 2, this.DEBUG = 3;
    this.level = this.INFO;


    this.getDateString = function() {
        var d = new Date();
        return "" + d.getFullYear() + pad(d.getMonth(), 2, '0') + pad(d.getDay(), 2, '0') + ":" +
            pad(d.getHours(), 2, '0') + " " + pad(d.getMinutes(), 2, 0) + ":" + pad(d.getSeconds(), 2, '0') + ":" + pad(d.getMilliseconds(), 3, '0');
    };

    this.getLevelString = function(lvl) {
        var ls;
        switch(lvl) {
             case 0: ls="ERROR"; break;
             case 1: ls=" WARN"; break;
             case 2: ls=" INFO"; break;
             case 3: ls="DEBUG"; break;
            default: ls = pad(lvl,5);
        }
        return "["+ls+"]";
    };


    this.formatRow = function(ar, l) {
        var sa = [];
        ar.forEach(function(ai) {
            sa.push(pad(ai, l, ' '))
        });
        return sa.join("");
    };

    this.isLogEnabled = function(lvl) {
        return lvl <= this.level;
    };


    this.log = function( lvl, m ){
        if(this.isLogEnabled(lvl)) {
            var d = this.getDateString();
            var l = this.getLevelString(lvl);
            this.formatRecord(d,l,m);
        }
    };

    this.debug = function( m ){
        this.log(this.DEBUG, m);
    };

    this.info = function( m ){
        this.log(this.INFO, m);
    };

    this.warn = function( m ){
        this.log(this.WARNING,m);
    };

    this.error = function( m ){
        this.og(this.ERROR,m);
    };

    this.json = function( lvl, m, o ) {
        if(this.isLogEnabled(lvl)) {
            this.log(lvl,m);
            printjson(o);
        }
    };

    this.byId = function(col, id ){
        var m = col+"@"+id;
        this.json(m, db[col].findOne({_id:id}));
    };

};
var log = new Logger() ;

