<!-- markdownlint-disable MD022 MD032 -->
# Creating JavaScript Objects
from [Programming in HTML5 with JavaScript and CSS3](https://www.amazon.com/Training-Guide-Programming-JavaScript-Microsoft/dp/0735674388) by Glenn Johnson, specifically, _Chapter 6: Essential JavaScript & jQuery_.

## JavaScript Objects - MS Approach
In JavaScript everything can be thought of as an object. This includes the six primitive data types:

- `String`, `Number`, `Boolean`
- `Symbol`, `null`, and `undefined`

JavaScript will also include complex data structure such as:

- _Object_, _Array_, and _Function_
- _Math_, _Date_, _JSON_, _RegExp_, and _Error_
- _NaN_, _Infinity_, and _-Infinity_

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

## JavaScript's prototypal nature
JavaScript is a prototype-based, functional programming language that uses objects. In JavaScript everything is an object, and you either create a new object from nothing, or you create an object from a clone of an existing object, known as a _prototype_.

JavaScript wasn't designed to be class-based but this behavior can be approximated by using a function. Class-based, object-oriented purists dislike the idea of a function being used to simulate a class but this can work to approximate a class _constructor_.

## JavaScript's object-oriented caveat
_Achieving proper encapsulation of private data requires you to create copies of the functions that can access the private data for each object instance, which consumes memory. If you don't want to create copies of the method for each object instance, the data needs to be publicly exposed, thus losing the benefits of encapsulations, by which you hide object details that users shouldn't need to see._

_The general consensus on the issue is that most people would rather expose the data to minimize wasteful memory consumption._

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

## Creating a class
There is no _class_ keyword in JavaScript, but you can simulate a class by starting with a function, which is actually the _constructor function_ of the object.

```javascript
function Vehicle( theYear, theMake, theModel ) {
    ...
}
```

The next step is to ensure we implement encapsulation. Then we need to create separate objects, each with its own data.

To implement encapsulation, use the _var_ keyword for the _year_, _make_, and _model_. This will make these variables private to the function. Notice that the _var_ keyword is not used with the `getInfo` variable because the `getInfo` variable needs to be public to be called from outside the object, but you don't want `getInfo` to be global. Assign `getInfo` to the current object by using the _this_ keyword. The result is a class that encapsulates the data and exposes _getInfo_ to retrieve the data in a controlled way as follows.

```javascript
function Vehicle( theYear, theMake, theModel ) {
    var year = theYear;
    var make = theMake;
    var model = theModel;

    this.getInfo - function() {
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

Each instance has these four variables, and memory is allocated for them. That's what you want for the data but is that what you want for the `getInfo` variable that references a function? The answer is that it depends on what you are trying to accomplish with your code. In some scenarios, this behavior is desirable, but in other scenarios, you might have wanted to replace the function across all objects. To do this, you can use the _prototype_ pattern.
