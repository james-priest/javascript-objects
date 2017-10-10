const log = require( '../cl.js' );
/**
 * JavaScript object literal pattern
 * Object literals create a pattern from nothing
 * They contain precisely what's assigned to them and nothing more.
 * No prototype object is associated with the created object.
 */

var car1 = {
    year: 2000,
    make: 'Ford',
    model: 'Fusion',
    getInfo: function() {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};
var car2 = {
    year: 2010,
    make: 'BMW',
    model: 'Z4',
    getInfo: function() {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};

log.cll( "car1.getInfo()", car1.getInfo() );
log.cll( "car2.getInfo()", car2.getInfo() );