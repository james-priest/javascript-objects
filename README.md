<!-- markdownlint-disable MD022 MD032 -->
# Creating JavaScript Objects
Largely taken from [Programming in HTML5 with JavaScript and CSS3](https://www.amazon.com/Training-Guide-Programming-JavaScript-Microsoft/dp/0735674388) by Glenn Johnson, specifically, _Chapter 6: Essential JavaScript & jQuery_.

## JavaScript Objects - MS Approach
In JavaScript everything is an object.

- _Numbers_, _strings_, and _arrays_
- _Objects_, , and _undefined_

## Object-oriented terminology
In many object-oriented language, you create a _class_, which is a blueprint for an object. Like a blueprint for a house, the blueprint isn't the house; it's the instructions that define the _type_ of object that you'll be constructing.

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