const test = require( 'tape' );
/**
 * JavaScript object encapsulation
 * Each instance is created by using the *new* keyword
 * Private data is encapsulated and accessible by way of public methods
 * Private data remains accessible through closure
 */

function Vehicle( theYear, theMake, theModel ) {
    var year = theYear;
    var make = theMake;
    var model = theModel;

    this.getInfo = function() {
        return 'Vehicle: ' + year + ' ' + make + ' ' + model;
    };
}

test( "Encapsulation Test", function( t ) {
    t.plan( 13 );
    var actual, expected;

    var car1 = new Vehicle( 2000, 'Ford', 'Fusion' );
    actual = car1.getInfo();
    expected = "Vehicle: 2000 Ford Fusion";

    t.ok( car1, "car1 exists" );
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );
    
    var car2 = new Vehicle( 2010, 'BMW', 'Z4' );
    actual = car2.getInfo();
    expected = "Vehicle: 2010 BMW Z4";
    
    t.ok( car2, "car2 exists" );
    t.isEqual( actual, expected, "car2.getInfo() matches expected" );

    console.log("---- extra tests ----"); // create a break

    t.true( Vehicle instanceof Object, "(Vehicle instanceof Object) is TRUE" );
    t.true( car1 instanceof Vehicle, "(car1 instanceof Vehicle) is TRUE" );
    t.true( car1 instanceof Object, "(car1 instanceof Object) is TRUE" );
    t.true( car2 instanceof Vehicle, "(car2 instanceof Vehicle) is TRUE" );
    t.true( car2 instanceof Object, "(car2 instanceof Object) is TRUE" );
    t.true( Vehicle.prototype.isPrototypeOf( car1 ), "(Vehicle.prototype.isPrototypeOf(car1)) is TRUE" );
    t.true( Object.prototype.isPrototypeOf( car1 ), "(Object.prototype.isPrototypeOf(car1)) is TRUE" );
    t.true( Vehicle.prototype.isPrototypeOf( car2 ), "(Vehicle.prototype.isPrototypeOf(car2)) is TRUE" );
    t.true( Object.prototype.isPrototypeOf( car2 ), "(Object.prototype.isPrototypeOf(car2)) is TRUE" );
} );

// Run code:
// node c-object-encapsulation.js

