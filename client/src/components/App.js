import React from 'react';
import Header from './Header';
import StudentForm from './StudentForm';



const App = () => {
  return (
    <div className="App container">
      <Header />
      <hr className="my-4" />
      <StudentForm />
    </div>
  );
}

export default App;
