import React, { Children, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return <TipCalculator />;
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tip1, setTip1] = useState("");
  const [tip2, setTip2] = useState("");

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage tip={tip1} onSetTip={setTip1}>
        How did your like the service?
      </SelectPercentage>
      <SelectPercentage tip={tip2} onSetTip={setTip2}>
        How did your friend like the service
      </SelectPercentage>
      <Output tip1={tip1} tip2={tip2} bill={bill} />
      <Reset />
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, tip, onSetTip }) {
  return (
    <div>
      <label>{children}</label>
      <select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was ok (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely Amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip1, tip2 }) {
  const total = tip1 + tip2 + bill;

  return (
    <h3>
      You pay ${total} (${bill} + ${tip1 + tip2} for the tip)
    </h3>
  );
}

function Reset() {
  return <button>Reset</button>;
}
