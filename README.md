<!-- markdownlint-disable MD022 MD032 -->
# Creating JavaScript Objects
from [Programming in HTML5 with JavaScript and CSS3](https://www.amazon.com/Training-Guide-Programming-JavaScript-Microsoft/dp/0735674388) by Glenn Johnson, specifically, _Chapter 6: Essential JavaScript & jQuery_.

## Table of Contents
1. [JavaScript Objects - MS Approach](#javascript-objects---ms-approach "toc")
1. [Object-oriented terminology](#object-oriented-terminology "toc")
1. [JavaScript's prototypal nature](#javascripts-prototypal-nature "toc")
1. [JavaScript's object-oriented caveat](#javascripts-object-oriented-caveat "toc")
1. [JavaScript object literal pattern](#javascript-object-literal-pattern)
1. [Creating dynamic objects by using the factory pattern](#creating-dynamic-objects-by-using-the-factory-pattern)
1. [Creating a class](#creating-a-class)
1. [Using the prototype pattern](#using-the-prototype-pattern)
1. [Debating the prototype/private compromise with getters](#debating-the-prototypeprivate-compromise-with-getters)
1. [Implementing namespaces](#implementing-namespaces)
    - [Namespace singleton object](#namespace-singleton-object)
    - [Creating namespace with IIFE for data encapsulation](#creating-namespace-with-iife-for-data-encapsulation)
    - [Creating a sub-namespace](#creating-a-sub-namespace)
1. [Implementing inheritance](#implementing-inheritance)
1. [Lesson Summary](#lesson-summary)
1. [Lesson Review](#lesson-review)

## JavaScript Objects - MS Approach
In JavaScript everything can be thought of as an object. This includes the six primitive data types:

- `String`, `Number`, `Boolean`
- `Symbol`, `null`, `undefined`

JavaScript will also include complex data structures such as:

- `Object`, `Array`, `Function`
- `Math`, `Date`, `JSON`, `RegExp`, `Error`
- `NaN`, `Infinity`, `-Infinity`

**[⬆ top](#creating-javascript-objects "toc")**

## Object-oriented terminology
In many object-oriented languages, you create a _class_, which is a blueprint for an object. Like a blueprint for a house, the blueprint isn't the house; it's the instructions that define the _type_ of object that you'll be constructing.

By using a house blueprint, you can _construct_ many houses that are based on the blueprint. Each house is an _object_ of type house, also known as an _instance_ of the house type.

In a baseball application, you might create a Player class (classes are normally capitalized) that has _properties_ for first and last name, batting average, error count, etc. Code for creating a team might use the Player class to create nine Player objects, each having its own properties. Each time you construct a Player object, memory is allocated to hold the data for the player, and each piece of data is a property, which has a name and a value.

The three pillars of object-oriented programming are _encapsulation_, _inheritance_, and _polymorphism_.

- **Encapsulation** means internal details of the object are hidden and protected from access by only exposing _public_ methods and properties to users of the object
- **Inheritance** means you can create a "is a" relationship between two classes, in which the child class automatically inherits everything that is in the parent class.
- **Polymorphism** means you can execute a function on the parent class, but the behavior changes because your child class has a function that _overrides_ the function in the parent class.

The _parent class_ is also known as the _base_ class, the _super_ class, or the _generalized_ class. The _child class_ is also known as the _derived_ class, the _subclass_, or the _specialized_ class.

In object-oriented programming, objects can have **data implemented as properties** and **behaviors implemented as methods**. A _property_ is essentially a variable that is defined on an object and owned by the object. A _method_ is a function that is defined on an object and owned by the object.

**[⬆ top](#creating-javascript-objects "toc")**

## JavaScript's prototypal nature
JavaScript is a prototype-based, functional programming language that uses objects. In JavaScript everything is an object, and you either create a new object from nothing, or you create an object from a clone of an existing object, known as a _prototype_.

JavaScript wasn't designed to be class-based but this behavior can be approximated by using a function. Class-based, object-oriented purists dislike the idea of a function being used to simulate a class but this can work to approximate a class _constructor_.

**[⬆ top](#creating-javascript-objects "toc")**

## JavaScript's object-oriented caveat
_Achieving proper encapsulation of private data requires you to create copies of the functions that can access the private data for each object instance, which consumes memory. If you don't want to create copies of the method for each object instance, the data needs to be publicly exposed, thus losing the benefits of encapsulations, by which you hide object details that users shouldn't need to see._

_The general consensus on the issue is that most people would rather expose the data to minimize wasteful memory consumption._

**[⬆ top](#creating-javascript-objects "toc")**

## JavaScript object literal pattern
- Object literals create a pattern from nothing.
- They contain precisely what's assigned to them and nothing more.
- No prototype object is associated with the created object.

```javascript
var car1 = {
    year: 2000,
    make: 'Ford',
    model: 'Fusion',
    getInfo: function() {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};
var car2 = {
    year: 2010,
    make: 'BMW',
    model: 'Z4',
    getInfo: function() {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};
```

The `getInfo` property doesn't contain data; it references an anonymous function instead, so it's a _method_. The method uses the _this_ keyword to access the data. Remember that the _this_ keyword references the _object that owns the code_ where the _this_ keyword is. If the _this_ keyword were omitted, the code would look in the global namespace for _year_, _make_, and _model_.

If you want to define an array of items and assign it to a property, you can use square brackets as shown below.

```javascript
var car1 = {
    year: 2000,
    make: 'Ford',
    model: 'Fusion',
    repairs: ['repair1', 'repair2', 'repair3'],
    getInfo: function() {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};
```

Because this is one of the easiest ways to create an object, you'll probably use it to gather data to send to other code. In this example, two instances of a type Object are created, and properties are dynamically added to each instance. This does not create a Vehicle type.

**[⬆ top](#creating-javascript-objects "toc")**

## Creating dynamic objects by using the factory pattern

In addition to using the JavaScript literal object syntax, JavaScript has an Object type, and you can use it to create an object programmatically. **Object has a prototype object that is cloned when you use the _new_ keyword to create a new Object instance.** The prototype object has the following inherited methods.

- **constructor** The function that is called to initialize a new object
- **hasOwnProperty** Returns a Boolean indicator of whether the current object has the specified property. `car1.hasOwnProperty('year') -> true`.
- **isPrototypeOf** Returns a Boolean indicator of whether the current object is in the specified object's prototype chain
- **propertyIsEnumerable** Returns true if the object can be enumerated in a for..in loop
- **toLocalString** Converts a date to a string value based on the current local
- **toString** Returns the string representation of the current object
- **valueOf** Returns the value of the current object converted to its most meaningful primitive value

After the object is created, you can dynamically add properties to it that hold the data and reference functions. You can wrap this code in a function that returns the object.

```javascript
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
```

The code takes advantage of JavaScript's dynamic nature to add _year_, _make_, _model_, and _getInfo_ to the object and then returns the object. Placing the code in a function makes it easy to call the getVehicle function to get a new Object.

The encapsulation of the code to create an object is commonly referred to as using the _factory pattern_.  You can create multiple instances of Object and add properties dynamically to each instance, but the actual type is `Object`, not `vehicle`. The variable name `vehicle` is just used to hold the new `Object` type before returning it from the `getVehicle` function.

Additionally, although the getVehicle function encapsulates the object creation, the properties are all public. If you want the data to be private, this approach won't work.

Just as when using the literal object syntax, you might encounter the problem that every vehicle's type is Object, and you might want to create a Vehicle class to have a named `Vehicle` type.

**[⬆ top](#creating-javascript-objects "toc")**

## Creating a class
There is no _class_ keyword in JavaScript (ES5), but you can simulate a class by starting with a function, which is actually the _constructor function_ of the object.

```javascript
function Vehicle( theYear, theMake, theModel ) {
    ...
}
```

The next step is to ensure we implement encapsulation. Then we need to create separate objects, each with its own data.

To implement encapsulation, use the _var_ keyword for the _year_, _make_, and _model_. This will make these variables private to the function. Notice that the _var_ keyword is not used with the `getInfo` variable because the `getInfo` variable needs to be public to be called from outside the object, but you don't want `getInfo` to be global. Assign `getInfo` to the current object by using the _this_ keyword. The result is a class that encapsulates the data and exposes _getInfo_ to retrieve the data in a controlled way as follows.

```javascript
function Vehicle( theYear, theMake, theModel ) {
    var year = theYear; // private
    var make = theMake; // private
    var model = theModel; // private

    this.getInfo - function() { // public
        return 'Vehicle' + year + ' ' + make + ' ' + model;
    };
}
```

Remember that the _this_ keyword references the object that owns the current code. This means that we must use the _new_ keyword to create an object from the class. Otherwise, the _this_ keyword will reference the global object and `getInfo` will be referring to a global variable.

```javascript
var car1 = new Vehicle( 2000, 'Ford', 'Fusion' );
var car2 = new Vehicle( 2010, 'BMW', 'Z4' );

var carInfo = car1.getInfo(); // Vehicle: 2000 Ford Fusion
```

Notice that a new variable is defined, `car1`, and it is assigned the object that is created by using the _new_ keyword. After that, another new variable is defined, `car2`, and it is assigned the second `Vehicle` object created by using the _new_ keyword.

Two instances of the `Vehicle` class are being created, which means that two `Vehicle` objects are being constructed. Each instance has its own data and its own copy of the `getInfo` method. The `getInfo` method is public but has access to the private data through _closure_. A method that is public but has access to private data is called a _privileged method_.

You have now created a class and constructed objects from the class. The Vehicle function you've used is known as a _constructor function_. The _new_ keyword created an object and executed the constructor function to initialize the object by creating the `year`, `make`, and `model` private variables and the public `getInfo` variable.

Each instance has these four variables, and memory is allocated for them. That's what you want for the data but is that what you want for the `getInfo` variable that references a function? The answer is that it depends on what you are trying to do. In some scenarios, this behavior is desirable, but in others, you might want to replace the function across all objects. To do this, you need to use the _prototype_ pattern.

**[⬆ top](#creating-javascript-objects "toc")**

## Using the prototype pattern
In JavaScript, everything, including the function, is an Object type, which has a _prototype_ property. The prototype itself is an object containing properties and methods that should be available to all instances of the type you're working with.

However, this prototype is typically specified externally to the constructor function, **so the prototype doesn't have access to private variables**. Therefore, you must expose the data for the prototype to work.

The following is an example of using the prototype property to create a single `getInfo` method that is shared across all instances.

```javascript
function Vehicle( theYear, theMake, theModel) {
    this.year = theYear; // public
    this.make = theMake; // public
    this.model = theMode; // public
}
Vehicle.prototype.getInfo = function() {
    return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
}
```

Remember, _this_ exposes the variable as a public property on `Vehicle` and _var_ defines the variable as private.

You might use the prototype property when creating functions that will be shared across all instances, but remember that the prototype is defined externally to the constructor function so all properties MUST BE PUBLIC using the _this_ keyword.

Therefore, if you don't need to replace individual instance functions and you don't mind making your data public, the prototype is efficient.

**[⬆ top](#creating-javascript-objects "toc")**

## Debating the prototype/private compromise with getters
There can be a compromise in which you can have private data that is readable by creating a method for retrieving the data, also known as a _getter_. (This getter will have no _setter_.) This requires you to write a function that is copied for each object, but you should keep the function as small as possible as shown here.

```javascript
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
```

Here we can replace the `getInfo` method and, because the data is exposed as read-only, it's available to be used in the new method.

```javascript
Vehicle.prototype.getInfo = function() {
        return 'Car Year: ' + this.getYear()
            + ' Make: ' + this.getMake()
            + ' Model: ' + this.getModel();
    };
```

In addition, the privileged getters are small, which minimizes the amount of memory consumed when each instance has a copy of the method. **Remember to only create getter methods as needed and to keep them small and concise.**

**[⬆ top](#creating-javascript-objects "toc")**

## Implementing namespaces
One problem to watch for is the pollution of the global namespace. As your program gets larger and libraries are added, more entries are added to the global object.

JavaScript doesn't have a namespace keyword, but you can implement the equivalent of a namespace by using techniques that are similar to those used to create objects.

```javascript
// Bad pollution of global namespace
var vehicleCount = 5;
var vehicle = new Array();

function Car() { }
function Truck() { }

var repair = {
    description: 'changed spark plugs',
    cost: 100
};
```

This code places five entries in the global namespace, and as the application grows, this namespace pollution also grows. _You can implement the namespace pattern to solve the problem._

```javascript
// Single entry in global namespace
var myApp = { };

myApp.vehicleCount = 5;

myApp.vehicles = new Array();

myApp.Car = function() { };
myApp.Truck = function() { };

myApp.repair = {
    description: 'changed spark plugs',
    cost: 100
};
```

Here, `myApp` is the only entry in the global namespace. It represents the name of the application and its root namespace. _Notice that the object literal syntax is used to create an empty object and assign it to myApp._ Everything else is added to the object. Sub-namespaces can also be created and assigned to `myApp`.

You can see a namespace was created by creating an object. Although only one entry is made in the global namespace, all the members of `myApp` are globally accessible.

**[⬆ top](#creating-javascript-objects "toc")**

### Namespace singleton object
You might also want to have logic to create the namespace object only if it hasn't been created. In the following example, the code for `myApp` is modified to create the namespace only if it doesn't already exist. This is done by creating a new object if `myApp` does not have a value.

```javascript
var myApp = myApp || {};
```

You can use the object techniques defined earlier to make some members of the namespace private and some public. The difference is that the namespace is a _singleton object_, so you create a single instance for the namespace.

You don't need to worry about functions defined in the constructor function consuming additional memory for each instance because there is only one instance.

**[⬆ top](#creating-javascript-objects "toc")**

### Creating namespace with IIFE for data encapsulation

Here is an example of the use of an _immediately invoked function expression_ (IIFE) to create the `myApp` namespace in which `Car` and `Truck` are public, but `vehicleCount`, `vehicles`, and `repair` are private.

```javascript
(function() {
    this.myApp = this.myApp || {};  // singleton pattern
    var ns = this.myApp;

    var vehicleCount = 5;           // private
    var vehicles = new Array();     // private

    ns.Car = function() {};         // public
    ns.Truck = function() {};       // public

    var repair = {                  // private
        description: 'changed spark plugs',
        cost: 100
    };
})();
```

An _IIFE_ (pronounced iffy) is an anonymous function expression that has a set of parentheses at the end of it which indicates that you want to execute the function. The anonymous function expression is wrapped in parentheses to tell the JavaScript  interpreter that the function isn't only being defined; it's also being executed when the file is loaded.

In the above IIFE, the first line creates the myApp namespace if it doesn't already exist, which represents the singleton object that is used as the namespace. Next, an `ns` variable (for namespace) is created as an alias to the namespace. This saves typing but most importantly creates a named "memory pointer" so the interpreter doesn't have to traverse the object chain each time we want to access a nested property. The result is `ns` can be used in place of the `this.myApp`. After that, the private members of the namespace are defined by using the _var_ keyword. `Car` and `Truck` are public, so they are prefixed with `ns`.

**[⬆ top](#creating-javascript-objects "toc")**

### Creating a sub-namespace
The following example shows adding a `billing` namespace under the `myApp` namespace.

```javascript
(function() {
    this.myApp = this.myApp || {};
    var rooNS = this.myApp;
    rootNS.billing = rootNS.billing || {};
    var ns = rootNS.billing;

    var taxRate = 0.05;
    ns.Invoice = function() {};
})();
```

This example also implements an IIFE to create the namespace. First, the `myApp` namespace is created if it doesn't already exist and is assigned to a local `rootNS` variable to save typing inside the namespace. Next, the billing namespace is created and assigned to the local `ns` variable to save typing inside the namespace. Finally, the private `taxRate` propertty is defined while the public `Invoice` is defined.

**[⬆ top](#creating-javascript-objects "toc")**

## Implementing inheritance
JavaScript provides the ability to implement inheritance, which is useful when you can define the relationship between two objects as an "is a" relationship. For example, and apple is a fruit, an employee is a person, and a piano is an instrument. _You look for "is a " relationships because they provide an opportunity to implement code reuse_.

If you have several types of vehicles, you can create `Vehicle` with the common vehicle traits defined in it. After `Vehicle` is created, you can create each vehicle type and inherit from `Vehicle` so you don't need duplicate code in each vehicle type.

**[⬆ top](#creating-javascript-objects "toc")**

### Base class

As an example of inheritance, start by defining the base case. Using the `Vehicle` example, the following is an example of a Vehicle base class.

```javascript
var Vehicle = (function() {
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
})();
```

This class is wrapped in an IIFE. The wrapper encapsulates the function and the Vehicle prototype. There is no attempt to make the data private. The code works as follows:

- When the code is loaded into the browser, the IIFE is immediately invoked
- A nested function called Vehicle is defined in the IIFE
- The Vehicle function's prototype defined the getInfo and startEngine functions that are on every instance of Vehicle
- A reference to the Vehicle function is returned, which is assigned to the `Vehicle` variable

**This is a great way to create a class, and all future class examples use this pattern.**

To create `Vehicle` objects, you use the _new_ keyword with the `Vehicle` variable. The following creates an instance of `Vehicle` and invokes the `getInfo` method.

```javascript
var v = new Vehicle( 2012, 'Toyota', 'Rav4' );
var actual = v.getInfo();
var expected = '2012 Toyota Rav4';
```

**[⬆ top](#creating-javascript-objects "toc")**

### Child classes

Now that  you have a Vehicle parent class with three properties and two methods, you can create child classes for `Car` and `Boat` that inherit from `Vehicle`.

Start by writing an IIFE but, this time, pass `Vehicle` into the IIFE as follows.

```javascript
var Car = (function( parent ) {
    ...
})(Vehicle);
```

Because Vehicle in this example is the `Vehicle` variable not the Vehicle function, `Car` needs to be defined after `Vehicle`. `Vehicle` is passed into the IIFE and is available inside the IIFE as _parent_.

Next, the function for `Car` can be added inside the IIFE. Inside the function, add any additional properties, such as `wheelQuantity`, and initialize to four.

In the function, call the parent class's constructor for `Car` to allocate memory slots for _year_, _make_, and _model_. To call the parent constructor function, use a _call_ method that exists on the Function object, which accepts a parameter for the `this` object, and parameters on the function being called, as follows.

```javascript
var Car = (function( parent ) {
    function Car( year, make, model) {
        parent.call(this, year, make, model);
        this.wheelQuantity = 4;
    }
    return Car;
})(Vehicle)
```

Notice how this example used the _call_ method to modify the `this` object; the `this` object is the `Car` object, so the call to the parent construction function creates _year_, _make_, and _model_ on the `Car` object.

Next, the inheritance must be set up. You might think that you've already set up inheritance because the previous example calls the parent class's constructor, and the _year_, _make_, and _model_ are created on `Car`, but `getInfo` and `startEngine` were not inherited.

The inheritance is accomplished by changing the `Car` prototype object to be a new `Vehicle` object. Remember that the prototype is the object that is cloned to create the new object. By default, the prototype is of type Object. After the new `Vehicle` is assigned to the prototype, the constructor of that `Vehicle` is changed to be the `Car` constructor as follows.

```javascript
var Car = (function( parent ) {
    Car.prototype = new Vehicle();          // <-- here
    car.prototype.constructor = Car;        // <-- here
    function Car( year, make, model ) {
        parent.call( this, year, make, model );
        this.wheelQuantity = 4;
    }
    return Car;
})(Vehicle);
```

Finally, you can add more methods into `Car`. In this example, the _getInfo_ method is added, which replaces the `Vehicle` getInfo method. The new `getInfo` gets some code reuse by calling the existing `getInfo` method on the parent `Vehicle` object's prototype. However, you must use the _call_ method and pass the `this` object as follows.

```javascript
var Car = (function( parent ) {
    Car.prototype = new Vehicle();
    Car.prototype.constructor = Car;
    function Car( year, make, model ) {
        parent.call( this, year, make, model );
        this.wheelQuantity = 4;
    }
    Car.prototype.getInfo = function() {                                    // <-- here
        return 'Vehicle Type: Car ' + parent.prototype.getInfo.call(this);  // <-- here
    };                                                                      // <-- here
    return Car;
})(Vehicle);
```

This completes `Car`, and `Boat` is similar except that `Boat` has a `propellerBladeQuantity`, which is initialized to three, instead of the `wheelQuantity` property. In addition, `getInfo` returns the vehicle type of `Boat` and calls the `Vehicle` `getInfo` method as follows.

```javascript
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
```

To create the `Car` and `Boat` objects, you use the _new_ keyword with the `Car` or `Boat` variable. The following creates instances of both `Car` and `Boat` and invokes each of their object-specific methods.

```javascript
var c = new Car( 2012, 'Toyota', 'Rav4' );
c.wheelQuantity; // 4
c.startEngine(); // 'Vroom'

var b = new Boat(1994, 'Sea Ray', 'Signature 200');
b.propellerBladeQuantity; // 3
b.startEngine(); // 'Vroom'
```

**[⬆ top](#creating-javascript-objects "toc")**

## Lesson Summary

- A class is a blueprint for an object in which an object is an instance of a class.
- The three pillars of object-oriented programming are encapsulation, inheritance, and polymorphism.
- The class from which you inherit is called the parent, base, super, or generalized class. The class that is derived from the parent is called the child, derived, sub, or specialized class. You can implement inheritance by replacing the Child class prototype with a new instance of the parent and replacing its constructor with the Child constructor function
- JavaScript is a prototype-based, object-oriented programming language. A prototype is the object used to create a new instance.
- The _literal pattern_ can be used to create an object by using curly braces to create the object. The _factory pattern_ can be used to create a dynamic object.
- JavaScript does not have a class keyword but you can simulate a class by defining a function.
- Creating private members is possible but usually involves creating privileged getter methods that can be memory consuming.
- The _function_ is an object. The function that simulates a class is called the _constructor function_.
- Namespaces can be created by using an immediately invoked function expression (IIFE).

**[⬆ top](#creating-javascript-objects "toc")**

## Lesson Review

1. What is the blueprint for an object called?
    - class
1. What does JavaScript use as a starting object when constructing a new object?
    - prototype
1. How is inheritance supported in JavaScript?
    - You replace the prototype of the child object with a new instance of the parent object and then replace the prototype constructor with the child constructor.