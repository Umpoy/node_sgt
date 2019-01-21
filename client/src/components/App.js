import React from 'react';
import GoogleAuth from './GoogleAuth';


const App = () => {
  return (
    <div className="App">
      <h1>React App</h1>
      <GoogleAuth />
      <button className="btn btn-danger">DANGER!!!</button>
    </div>
  );
}

export default App;
