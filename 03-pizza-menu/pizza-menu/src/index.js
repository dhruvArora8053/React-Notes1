import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello React!</h1>;
}

//React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//React.StrictMode:
//1. it will render our components twice in order to find certain bugs
//2. it will check if we're using outdate parts of the react API

//React before v18
//React.render(<App />, document.getElementById("root"))
