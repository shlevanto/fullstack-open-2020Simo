import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  console.log("Hello from komponentti")
  return (
  <div>
    <p>Hello World, it is {now.toString()}</p>
    <p>
      {a} plus {b} on {a + b}
    </p>
  </div>
  )
  }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

