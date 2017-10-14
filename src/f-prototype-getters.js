const test = require( 'tape' );
/**
 * JavaScript prototype getters with private data properties
 * The pattern below shows how to make getters to access private data
 * There is no setter equivalent
 * Each instance has it's own copy of the getter methods so make sure to keep
 *   them as small as possible
 */

function Vehicle( theYear, theMake, theModel ) {
    var year = theYear; //private
    var make = theMake; // private
    var model = theModel; // private
    this.getYear = function() { return year; };
    this.getMake = function() { return make; };
    this.getModel = function() { return model; };
}
Vehicle.prototype.getInfo = function() {
    return 'Vehicle: ' + this.getYear() + ' ' + this.getMake() + ' ' + this.getModel();
};

test( "Instance Test Using Prototype and getters", function( t ) {
    t.plan( 6 );
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

    Vehicle.prototype.getInfo = function() {
        return 'Car Year: ' + this.getYear()
            + ' Make: ' + this.getMake()
            + ' Model: ' + this.getModel();
    };
    console.log( "--- Update prototype getInfo method ---" );

    actual = car1.getInfo();
    expected = "Car Year: 2000 Make: Ford Model: Fusion";    
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );

    actual = car2.getInfo();
    expected = "Car Year: 2010 Make: BMW Model: Z4";    
    t.isEqual( actual, expected, "car2.getInfo() matches expected" );
} );

// Run code:
// node c-object-encapsulation.js
