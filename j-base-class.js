const test = require( 'tape' );
/**
 * JavaScript Vehicle base class
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
