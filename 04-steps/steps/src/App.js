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
  const [isOpen, setIsOpen] = useState(true);
  //useState function here is known as hook, use keyword represents hook, hooks are not allowed to call inside of a function or a block, otherwise we would get an error

  // function handlePrevious() {
  //   alert("Previous");
  // }

  // function handleNext() {
  //   alert("Next");
  // }

  function handlePrevious() {
    // if (step > 1) setStep(step - 1);
    //we should not change the state like this  instead:

    if (step > 1) setStep((s) => s - 1);
  }

  const [test, setTest] = useState({ name: "Jonas" });

  function handleNext() {
    if (step < 3) {
      //this won't work
      // setStep(step + 1);
      // setStep(step + 1);

      //instead
      setStep((s) => s + 1);
      setStep((s) => s + 1);
      //now it's updating the next twice
      //in order to be safe for future updates, it's a good idea to always use a callback like this when we want to update state based on the current value of that state.
    }

    // step = step + 1;
    //and this won't work because the react has no magic way of knowing that this here is the state variable and that this operation is basically updating it and so that's why react provided us with the useState setter function which is a fucnitonal way of updating the state value but without mutating it, because here we are directly mutating the step variable but react is all about immutability and so therefore we can only update the state using the tools that react gives us so in this case the setStep funciton so this setter function is tied to step state variable, so when we use the functional way of updating the state then React does know that this is the state variable that should be updated

    // BAD PRACTICE
    // test.name = "Fred";
    //this will acutally work, so mutating the object like this did actually trigger a new rerender of the component view however, mutating objects like this is a really really bad practice and that's because sometimes in more complex situtations this acutally won't work and in general it's really just a bad practice of mutating objects like this especially in a framework like react which is all about immutability and functional state updates, instead we would do:
    setTest({ name: "Fred" });
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {/* by closing and opening we rerendered this component so many time but the react still has the same state of step so react holds state in the memory even though that component has been re-rendered countless times */}
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
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
              //when the App component will be executed it will read the onMouseEnter and just like javascript we provided the callback so this callback function will wait for the event to happen to execute it's functionality
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
