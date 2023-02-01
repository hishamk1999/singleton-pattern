# Singleton Pattern

Share a **single** global instance throughout your application.

Singletons are classes which can be instantiated once, and can be accessed **globally**.

which makes **Singletons** great for managing global state in an application.

For this example, we’re going to build a `Counter`class that has:

- a `getInstance` method that returns the value of the instance.
- a `getCount` method that returns the current value of the `counter` variable.
- an `increment` method that increments the value of `counter` by one.
- a `decrement` method that decrements the value of `counter` by one

```jsx
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}
```

However, this class doesn’t meet the criteria for a Singleton! A Singleton should only be able to get **instantiated once**. 

Currently, we can create multiple instances of the `Counter`class.

```jsx
const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

By calling the `new` method twice, we just set `counter1` and `counter2` equal to different instances.

The values returned by the `getInstanc` method on `counter1` and `counter2` effectively returned references to different instances: they aren't strictly equal!

[Let’s make sure that only **one** instance of the `Counter` class can be created.](https://github.com/hishamk1999/singleton-pattern/blob/main/jspat-52_zkwyk1.gif)

Let’s make sure that only **one** instance of the `Counter` class can be created.

One way to make sure that only one instance can be created, is by creating a variable called `instance` .

In the constructor of `Counter`, we can set `instance` equal to a reference to the instance when a new instance is created.

We can prevent new instantiations by checking if the `instance` variable already had a value.

If that's the case, an instance already exists. 

This shouldn't happen: an error should get thrown to let the user know.

```jsx
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

we should freeze the instance as well. 

The `Object.freeze` method makes sure that consuming code cannot modify the Singleton. Properties on the frozen instance cannot be added or modified, which reduces the risk of accidentally overwriting the values on the Singleton.

Let's export the `Counter` instance from the `counter.js` file.

```jsx
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}
const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

Let's take a look at an application that implements the `Counter`example. We have the following files:

- `counter.js`: contains the `Counter` class, and exports a **`Counter` instance** as its default export.
- `index.js`: loads the `redButton.js` and `blueButton.js` modules.
- `redButton.js`: imports `Counter`, and adds `Counter`'s `increment` method as an event listener to the **red** button, and logs the current value of `counter` by invoking the `getCount` method.
- `blueButton.js`: imports `Counter`, and adds `Counter`'s `increment` method as an event listener to the **blue** button, and logs the current value of `counter` by invoking the `getCount` method

[jspat-56_wylvcf.mp4](jspat-56_wylvcf.mp4)

When we invoke the `increment` method in either `redButton.js` or `blueButton.js` , the value of the `counter` property on the `Counter` instance updates in both files.

It doesn't matter whether we click on the red or blue button: the same value is shared among all instances.

This is why the counter keeps incrementing by one, even though we're invoking the method in different files.
