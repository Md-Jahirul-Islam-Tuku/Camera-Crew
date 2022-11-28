import React from 'react';
import logo from '../../src/Assets/img/icon/blog.png'

const Blog = () => {
  return (
    <div className='min-h-[100vh] bg-gray-200 text-primary px-8'>
      <img src={logo} alt="logo" className='h-24 w-24 mx-auto pt-5 mb-5' />
      <div>
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-3xl font-medium">
            What are the different ways to manage a state in a React application?
          </div>
          <div className="collapse-content text-left px-14">
            <p className='text-xl'>In React apps, there are at least several ways to handle the state. Let us briefly explore a few of them in this part.</p>
            <h2 className='text-2xl text-left'>URL</h2>
            <article className='text-xl'>We can use URL to store some data e.g.
              <div className='ml-5'>
                <p>* The id of the current item, being viewed</p>
                <p>* Filter parameters</p>
                <p>* Pagination offset and limit</p>
                <p>* Sorting data</p>
              </div>
              Keeping such data in the URL allows users to share deep links with others.</article>
            <h2 className='text-2xl text-left'>Web storage</h2>
            <article className='text-xl'>The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.</article>
            <h2 className='text-2xl text-left'>Local state</h2>
            <article className='text-xl'>The third option is to use store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.</article>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-3">
          <div className="collapse-title text-3xl font-medium">
            What are the different ways to manage a state in a React application?
          </div>
          <div className="collapse-content text-left px-14">
            <p className='text-xl'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is <strong>a method by which an object can inherit the properties and methods of another object.</strong> Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-3">
          <div className="collapse-title text-3xl font-medium">
            What is a unit test? Why should we write unit tests?
          </div>
          <div className="collapse-content text-left px-14">
            <p className='text-xl'>The main objective of unit testing is <strong>to isolate written code to test and determine if it works as intended.</strong> Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-3">
          <div className="collapse-title text-3xl font-medium">
            React vs Angular vs vue?
          </div>
          <div className="collapse-content text-left px-14">
            <h2 className='text-2xl'>Angular</h2>
            <p className='text-xl'><strong>Angular</strong> has a steep learning curve, considering it is a complete solution, and mastering Angular requires you to learn associated concepts like TypeScript and MVC. Even though it takes time to learn Angular, the investment pays dividends in terms of understanding how the front end works.</p>
            <h2 className='text-2xl'>React</h2>
            <p className='text-xl'><strong>React</strong> offers a Getting Started guide that should help one set up React in about an hour. The documentation is thorough and complete, with solutions to common issues already present on Stack Overflow. React is not a complete framework and advanced features require the use of third-party libraries. This makes the learning curve of the core framework not so steep but depends on the path you take with additional functionality. However, learning to use React does not necessarily mean that you are using the best practices.</p>
            <h2 className='text-2xl'>Vue</h2>
            <p className='text-xl'><strong>Vue</strong> provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option. However, simplicity and flexibility of Vue is a double-edged sword — it allows poor code, making it difficult to debug and test.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; <h1>This is Blog page</h1>