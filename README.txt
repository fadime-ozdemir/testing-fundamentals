Jest
Jest provides the two key ingredients needed for testing:

An assertion library – an API of functions for validating a program’s functionality
A test runner – a tool that executes tests and provides outputted test summaries

Calling tests:
- Jest
- jest dir/file_name.test.js

Flags : 

--coverage :
ex ==> jest __tests__/ --coverage
This --coverage flag allows us to get a report of which lines of our code were actually tested

UNIT TESTS
 A unit test is designed to test the smallest unit of your code,
 like a single function.

 The test() function takes three arguments:
A string describing what is being tested
A callback function containing assertions and other testing logic
An optional timeout in milliseconds that specifies how long a test should wait before automatically aborting. If unspecified, this defaults to 5000 ms.

We follow the Arrange, Act, Assert pattern in the callback passed to test()

Let’s go over the matchers used in this example:
.toBeDefined() is used to verify that a variable is not undefined. This is often the first thing checked.
.toEqual() is used to perform deep equality checks between objects.
.toBe() is similar to .toEqual() but is used to compare primitive values.
.toBeTruthy() is used to verify whether a value is truthy or not.
.not is used before another matcher to verify that the opposite result is true
.toContain() is used when we want to verify that an item is in an array. In this case, since the .not matcher is used, we are verifying that "Ice Cream" is NOT in the array.

ASYNC tests
If we wanted to make sure that this function does in fact get the requested data, we may be tempted to put our expect() assertion inside the callback function.
However, this test would leave us vulnerable to a false positive, meaning it would pass even if our API call and/or assertion failed!
To fix this issue, Jest allows us to add a done parameter in the test() callback function. The value of done is a function and, when included as a parameter, Jest knows that the test should not finish until this done() function is called.
the expect() and done() call are being made in a try block. Without this, if the assertion were to fail, expect() would throw an error before the done() function gets a chance to be called. From Jest’s perspective, the reason for the test failure would be a timeout error (since done() was never called) rather than the actual error thrown by the failed expect() assertion.
By using a catch block, we can capture the error value thrown and pass it to done(), which then displays it in the test output.

Mocking calls with Jest
Bypasses the API call and returns values that we control.
Testing with a real REST API is not ideal for a few reasons:
We aren’t concerned about whether the third-party API works. Instead, we only care about whether or not the function that performs the API call works.
Incorporating REST API calls into our tests can create fragile tests that may fail simply due to network issues.
If we were interacting with a production-grade database, we could accidentally alter official data.
We put mocks functions in __mocks__ folder


RTL: React Testing Library
React Testing Library focuses on testing components from the end-user’s experience rather than testing the implementation and logic of the underlying React components.
We can import the two essential values, render and screen, into our tests.

render() is a function that we can use to virtually render components and make them available in our unit tests.
 1. Similar to ReactDOM.render(), RTL’s render() function takes in JSX as an argument.
 2. screen is a special object which can be thought of as a representation of the browser window.
    We can make sure that our virtually rendered components are available in the test by using the screen.debug() method which prints out all the DOM contents.

To test dom assertion we should use jest dom package

Querying
There are a number of .getByX query methods to choose from and they are all accessible as methods on the screen object.
Other querying methods are .queryByX and .findByX. 
The .queryByX methods return null if they don’t find a DOM node, unlike the .getByX methods which throw an error and immediately cause the test to fail. This is useful when asserting that an element is NOT present in the DOM.
The .findByX methods are used to query for asynchronous elements which will eventually appear in the DOM. For example, if the user is waiting for the result of an API call to resolve before data is displayed. The .findByX methods work by returning a Promise which resolves when the queried element renders in the DOM. As such, the async/await keywords can be used to enable asynchronous logic.

Mimicking User Interactions
Mimic user interactions e.g. clicking a checkbox, typing text, etc. 
Syntax pattern
userEvent.interactionType(nodeToInteractWith);

The waitFor() method
For components that disappear asynchronously.
The waitFor() method can also optionally accept an options object as a second argument. This object can be used to control how long to wait for before aborting and much more.


