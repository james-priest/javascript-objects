const test = require( 'tape' );
/**
 * JavaScript namespace singleton
 *
 * We ensure one and only one instance of the namespace object is created
 * In order to do this we use short-circuiting and the logical OR pattern
 * It preserves the existing namespace object if it was previously defined
 * It creates an empty object if one doesn't already exist
 */

var myApp = myApp || {};

/*
myApp = { prop1: 0 }; // If this is already defined in a previously included file
var myApp = myApp || {}; // This line preserves it or sets it to empty object 
*/

test( "Namespace singleton test - test that only one instance exists", function( t ) {
    t.plan( 6 );
    var actual, expected;

    t.ok( myApp, "myApp exists" );

    myApp.prop1 = 12;
    actual = myApp.prop1;
    expected = 12;
    t.isEqual( actual, expected, "myApp.prop1 matches expected" );

    var app1 = myApp;
    t.ok( app1, "app1 exists" );
    
    app1.prop1 = 23;
    actual = app1.prop1;
    expected = myApp.prop1;
    t.isEqual( actual, expected, "app1.prop1 matches myApp.prop1" );

    var app2 = myApp;
    t.ok( app2, "app2 exists" );

    actual = app1;
    expected = app2;
    t.deepEquals( actual, expected, "app1 matches app2" );
} );

