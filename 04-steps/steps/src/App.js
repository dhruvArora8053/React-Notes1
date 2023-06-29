const messages = ["Learn React", "Apply for jobs", "Invest your new income"];
// this data should be located outside because otherwise each time the App function is executed than this above data will be declared again

export default function App() {
  const step = 1;
  //this step here we want to update when we click the previous or next button

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
