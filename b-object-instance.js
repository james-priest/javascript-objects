const test = require( 'tape' );
/**
 * JavaScript object instance using factory pattern
 * Object type can be used to create an object programmatically
 * Object has a prototype object that is cloned when you use the *new* keyword
 *   to create a new Object instance
 */

function getVehicle( theYear, theMake, theModel ) {
    var vehicle = new Object();
    
    vehicle.year = theYear;
    vehicle.make = theMake;
    vehicle.model = theModel;

    vehicle.getInfo = function() {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    };
    
    return vehicle;
}

test( "Create Instance Test Using Factory Pattern", function( t ) {
    t.plan( 8 );
    var actual, expected;

    var car1 = getVehicle( 2000, "Ford", "Fusion" );
    actual = car1.getInfo();
    expected = "Vehicle: 2000 Ford Fusion";

    t.ok( car1, "car1 exists" );
    t.isEqual( actual, expected, "car1.getInfo() matches expected" );
    
    var car2 = getVehicle( 2010, 'BMW', 'Z4' );
    actual = car2.getInfo();
    expected = "Vehicle: 2010 BMW Z4";
    
    t.ok( car2, "car2 exists" );
    t.isEqual( actual, expected, "car2.getInfo() matches expected" );

    t.false( Object.isPrototypeOf( car2 ), "Object.isPrototypeOf( car2 ) is FALSE " );
    t.true( Object.prototype.isPrototypeOf( car2 ), "Object.prototype.isPrototypeOf( car2 ) is TRUE" );

    t.true( car2 instanceof Object, "car2 instanceof Object is TRUE" );
    t.false( car2 instanceof getVehicle, "car2 instanceof getVehicle is FALSE" );
} );



