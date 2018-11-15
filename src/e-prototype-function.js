const test = require( 'tape' );
/**
 * JavaScript prototype pattern
 * In JavaScript every object including the function has a prototype property
 * The prototype itself is an object containing properties and methods and is
 *   available to all instances of the type it is associated to
 * The prototype is typically specified externally to the constructor function
 *   which means it doesn't have access to private variables
 * Therefore, we must expose the data for the prototype to work
 */

function Vehicle( theYear, theMake, theModel ) {
    this.year = theYear; //public
    this.make = theMake; // public
    this.model = theModel; // public
}
Vehicle.prototype.getInfo = function() {
    return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
};

test( "Instance Test Using Prototype", function( t ) {
    t.plan( 4 );
    var actual, expected;

    var car1 = new Vehicle( 2000, 'Ford', 'Fusion' );
    t.ok( car1, "car1 exists" );

    var car2 = new Vehicle( 2010, 'BMW', 'Z4' );
    t.ok( car2, "car2 exists" );

    actual = car1.getInfo();
    expected = "Vehicle: 2000 Ford Fusion";    
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );

    actual = car2.getInfo();
    expected = "Vehicle: 2010 BMW Z4";    
    t.isEqual( actual, expected, "car2.getInfo() matches expected" );
} );

test( "Instance Test Using Prototype Replace Function", function( t ) {
    t.plan( 2 );
    var actual, expected;

    var car1 = new Vehicle( 2000, 'Ford', 'Fusion' );
    var car2 = new Vehicle( 2010, 'BMW', 'Z4' );
    Vehicle.prototype.getInfo = function() {
        return 'Car: ' + this.year + ' ' + this.make + ' ' + this.model;
    };

    actual = car1.getInfo();
    expected = "Car: 2000 Ford Fusion";    
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );

    actual = car2.getInfo();
    expected = "Car: 2010 BMW Z4";    
    t.isEqual( actual, expected, "car2.getInfo() matches expected" );
} );

// Run code:
// node c-object-encapsulation.js
