// these files must be accessible from the 'mongo' execution context 

load("Utils.js")
load("Logger.js")

log.info("Informational message");
log.debug("This should not print as log default is info");

log.level = log.DEBUG;
log.debug("debug level should print this time. ");

log.warn("Danger don't tell the DBAs your using mongodb, they'll freak.");

var colNames = db.getCollectionNames();

var row = log.formatRow(colNames,20);
log.info( "Collections: "+row );

