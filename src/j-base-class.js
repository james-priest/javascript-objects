const test = require( 'tape' );
/**
 * JavaScript base class
 * Based on "is a" relationships; apple is a fruit; employee is a person, etc.
 * Finding these relationships provide an opportunity for code reuse.
 * Create a Vehicle object with all common Vehicle traits defined in it
 * Then create each vehicle type to inherit from Vehicle so you don't have to
 *   duplicate code in each vehicle type
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
    
test( "Base Class Test", function( t ) {
    t.plan( 3 );
    var actual, expected;

    var v = new Vehicle( 2012, 'Toyota', 'Rav4' );
    t.ok( v, "v exists" );

    actual = v.getInfo();
    expected = "2012 Toyota Rav4";    
    t.isEqual( actual, expected, "v.getInfo() matches expected" );

    actual = v.startEngine();
    expected = "Vroom";    
    t.isEqual( actual, expected, "v.startEngine() matches expected" );
} );
