import { useState } from "react";

export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* basically we also want to transform this element right here into a controlled element and remember a controlled element means that the element has the value defined by some state and it also has an event handler which listens for the change and updates the state accordingly */}

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
