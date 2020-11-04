import React from 'react';
import Nav from './features/books/Nav.js';
import Books from './features/books/Books.js';

function App() {
  return (
    <div className="Bookstore mx-auto rounded my-md-5 shadow-lg">
      <Nav />
      <Books />
    </div>
  );
}

export default App;
