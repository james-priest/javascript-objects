const test = require( 'tape' );
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
    repairs: ['repair1', 'repair2', 'repair3'],    
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

test( "Object Literal Test", function( t ) {
    t.plan( 4 );
    var actual, expected;

    actual = car1.getInfo();
    expected = "Vehicle: 2000 Ford Fusion";

    t.ok( car1, "car1 exists" );
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );
    
    actual = car2.getInfo();
    expected = "Vehicle: 2010 BMW Z4";
    
    t.ok( car2, "car2 exists" );
    t.isEqual( actual, expected, "car2.getInfo() matches expected" );
} );

