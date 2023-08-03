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
  const [bill, setBill] = useState(0);

  return (
    <>
      <TotalBill bill={bill} setBill={setBill} />
      <ServiceRating>How did you like the service?</ServiceRating>
      <ServiceRating>How did your friend like the service?</ServiceRating>
      <TotalPayment />
    </>
  );
}

function TotalBill({ bill, setBill }) {
  return (
    <div className="flex">
      <h3>How much was the bill?</h3>
      <input
        type="text"
        placeholder="Bill..."
        value={bill}
        onChange={(e) => {
          setBill(e.target.value);
        }}
      />
    </div>
  );
}

function ServiceRating({ children }) {
  return (
    <div className="flex">
      <h3>{children}</h3>
      <select>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good(10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function TotalPayment({ bill, tip }) {
  const fullPay = bill + tip;

  return (
    <div>
      <h2>
        You pay ${fullPay} (${bill}+${tip})
      </h2>
      <button>Reset</button>
    </div>
  );
}
