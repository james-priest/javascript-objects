const test = require( 'tape' );
/**
 * JavaScript method replacement
 * Each instance has its own properties & methods
 * These props and methods are separate from that of any other object
 * A change in one instance will not affect another instance
 * This is desirable for an object's data but is it desirable for its methods too?
 *
 * NOTE: Any new or updated functions will not be able to access private data in the
 * Vehicle object instance. This is because the new or updated method is executed
 * externally to the initial Vehicle object creation that contained the private data.
 * This private data is 'bound up' in the Vehicle object's closure (lexical environment).
 */

function Vehicle( theYear, theMake, theModel ) {
    var year = theYear;
    var make = theMake;
    var model = theModel;

    this.getInfo = function() {
        return 'Vehicle: ' + year + ' ' + make + ' ' + model;
    };
}

test( "Function Replacement Test", function( t ) {
    t.plan( 4 );
    var actual, expected;

    var car1 = new Vehicle( 2000, 'Ford', 'Fusion' );
    t.ok( car1, "car1 exists" );

    car1.getInfo = function() {
        return 'This is a car';
    };
    actual = car1.getInfo();
    expected = "This is a car";    
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );

    var car2 = new Vehicle( 2010, 'BMW', 'Z4' );
    t.ok( car2, "car2 exists" );

    actual = car2.getInfo();
    expected = "This is a car";    
    t.isEqual( actual, expected, "car2.getInfo() does not match expected" );

    console.log("changing the method on one object does not carry over to other objects.")
} );

// Run code:
// node d-method-replacement.js
