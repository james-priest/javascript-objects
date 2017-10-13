const test = require( 'tape' );
/**
 * JavaScript namespace iife
 * 'this.myApp' is used to create single 'myApp' var in the global namespace
 * 'ns' is used as shorthand to 'this.myApp'
 * Anything preceded with 'ns' in the function expression is public
 * Anything preceded with 'var' is private
 */

(function() {
    this.myApp = this.myApp || {};  // singleton pattern
    var ns = this.myApp;            // private

    var vehicleCount = 5;           // private
    var vehicles = new Array();     // private

    ns.Car = function() {};         // public
    ns.Truck = function() {};       // public

    var repair = {                  // private
        description: 'changed spark plugs',
        cost: 100
    };
})();

test( "Namespace test", function( t ) {
    t.plan( 6 );
    var actual, expected;

    console.log(" --- public vars and methods ---")
    t.ok( myApp, "myApp exists" );
    t.ok( myApp.Car, "myApp.Car exists" );
    t.ok( myApp.Truck, "myApp.Truck exists" );
    console.log( " --- private vars and methods --- " );
    t.notOk( myApp.vehicleCount, "myApp.vehicleCount is not accessible" );
    t.notOk( myApp.vehicles, "myApp.vehicles is not accessible")
    t.notOk( myApp.repair, "myApp.repair is not accessible" );
} );

