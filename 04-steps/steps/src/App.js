import { useState } from "react";

const messages = ["Learn React", "Apply for jobs", "Invest your new income"];
// this data should be located outside because otherwise each time the App function is executed than this above data will be declared again

export default function App() {
  // const step = 1;
  //this step here we want to update when we click the previous or next button

  //using states --> 3 steps:
  //1. we add a new state variable
  //2. we use it in a code, usually JSX
  //3. we update the piece of state in some event handler

  // const arr = useState(1);
  // console.log(arr);
  //1 is a default value here and the useState function will return an array
  //as you see in a console this arr has two values, 1st value is the default value that we want for our state and then the 2nd one is a fucntion that we can use to update our state variable, let's do destructuring on it:
  const [step, setStep] = useState(1);

  function handlePrevious() {
    alert("Previous");
  }

  function handleNext() {
    alert("Next");
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        {/* adding listeners */}
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevious}
          //notice here we are just passing the function value so we are not calling it because if we would be calling it then it would get executed immediately

          // onMouseEnter={() => alert("TEST")}
          //when the App component will be executed it will read the onMouseEnter and just like javascript we provied the callback so this callback function will wait for the event to execute it's functionality
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={() => handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
