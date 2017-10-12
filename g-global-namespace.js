const test = require( 'tape' );
/**
 * JavaScript global namespace
 * Creating a single namespace object avoids global namespace pollution
 * The namespace object represents the name of the application and its root namespace
 * All members are globally accessible
 */

var myApp = { };

myApp.vehicleCount = 5;

myApp.vehicles = new Array();

myApp.Car = function() { };
myApp.Truck = function() { };

myApp.repair = {
    description: 'changed spark plugs',
    cost: 100
};

test( "Namespace test", function( t ) {
    t.plan( 7 );
    var actual, expected;

    t.ok( myApp, "myApp exists" );
    t.ok( myApp.Car, "myApp.Car exists" );
    t.ok( myApp.Truck, "myApp.Truck exists" );
    t.ok( myApp.repair, "myApp.repair exists" );

    actual = myApp.vehicleCount;
    expected = 5;    
    t.isEqual( actual, expected, "myApp.vehicleCount matches expected" );

    actual = myApp.repair.description;
    expected = "changed spark plugs";
    t.isEqual( actual, expected, "myApp.repair.description matches expected" );

    actual = myApp.repair.cost;
    expected = 100;
    t.isEqual( actual, expected, "myApp.repair.cost matches expected" );
} );

