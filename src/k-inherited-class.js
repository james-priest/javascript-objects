const test = require( 'tape' );
/**
 * JavaScript inherited class
 * Start with an IIFE and pass in the base class as a parameter to the IIFE
 * Create a constructor function for the inherited object
 * In the function, call the parent class's constructor, then add any new methods
 * Next, setup inheritance by replacing the prototype of the child object with a
 *  new instance of the parent object
 * Then, replace the prototype constructor with the child constructor (see code below..)
 * See https://www.w3schools.com/js/js_function_call.asp for docs on call method
 */

var Vehicle = ( function() {
    function Vehicle( theYear, theMake, theModel ) {
        this.year = theYear;
        this.make = theMake;
        this.model = theModel;
    }
    Vehicle.prototype.getInfo = function() {
        return this.year + ' ' + this.make + ' ' + this.model;
    };
    Vehicle.prototype.startEngine = function() {
        return 'Vroom';
    };
    return Vehicle;
} )();

var Car = (function( parent ) {
    Car.prototype = new Vehicle();
    Car.prototype.constructor = Car;
    function Car( year, make, model ) {
        parent.call( this, year, make, model );
        this.wheelQuantity = 4;
    }
    Car.prototype.getInfo = function() {
        return 'Vehicle Type: Car ' + parent.prototype.getInfo.call( this );
    };
    return Car;
})(Vehicle);

var Boat = (function( parent ) {
    Boat.prototype = new Vehicle();
    Boat.prototype.constructor = Car;
    function Boat( year, make, model ) {
        parent.call( this, year, make, model );
        this.propellerBladeQuantity = 3;
    }
    Boat.prototype.getInfo = function() {
        return 'Vehicle Type: Boat ' + parent.prototype.getInfo.call(this);
    };
    return Boat;
})(Vehicle);


test( "Car Inheritance Test", function( t ) {
    // t.plan( 3 );
    var actual, expected;

    var c = new Car( 2012, 'Toyota', 'Rav4' );
    t.ok( c, "c exists" );

    actual = c.year;
    expected = 2012;
    t.isEqual( actual, expected, "c.year matches expected" );

    actual = c.make;
    expected = "Toyota";
    t.isEqual( actual, expected, "c.make matches expected" );

    actual = c.model;
    expected = "Rav4";
    t.isEqual( actual, expected, "c.model matches expected" );

    actual = c.wheelQuantity;
    expected = 4;    
    t.isEqual( actual, expected, "c.wheelQuantity matches expected" );

    actual = c.getInfo();
    expected = "Vehicle Type: Car 2012 Toyota Rav4";    
    t.isEqual( actual, expected, "c.getInfo() matches expected" );

    actual = c.startEngine();
    expected = "Vroom";
    t.isEqual( actual, expected, "c.startEngine() matches expected" );

    t.end();
} );

test( "Boat Inheritance Test", function( t ) {
    // t.plan( 3 );
    var actual, expected;

    var b = new Boat( 1994, 'SeaRay', 'Signature 200' );
    t.ok( b, "b exists" );

    actual = b.year;
    expected = 1994;
    t.isEqual( actual, expected, "b.year matches expected" );

    actual = b.make;
    expected = "SeaRay";
    t.isEqual( actual, expected, "b.make matches expected" );

    actual = b.model;
    expected = "Signature 200";
    t.isEqual( actual, expected, "b.model matches expected" );

    actual = b.propellerBladeQuantity;
    expected = 3;    
    t.isEqual( actual, expected, "b.propellerBladeQuantity matches expected" );

    actual = b.getInfo();
    expected = "Vehicle Type: Boat 1994 SeaRay Signature 200";    
    t.isEqual( actual, expected, "b.getInfo() matches expected" );

    t.end();
} );