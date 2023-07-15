import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  //derived states
  //we should not do this
  // const [numItems, setNumItems] = useState(0);
  //now the problem with this now we have to update state of numItems, so whenever for ex one new item is added besides setting the items we also need to make sure to increase the number here:

  //instead, should do this:
  // const numItems = items.length;
  //so this works because as soon as the items are updated, so as soon as the items piece of state is updated the component will rerender and when the component rerenders that means that the function here is called again and therefore then this piece of code here will run again

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    //should not do this
    // setNumItems((num) => num + 1);
    //so with this we would ensure that these two pieces of state stay in sync, but this is ofcourse a lot of additional work that we might forget to do and also it can cause multiple rerenders where atleas one of them here in unecessary
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //look at the flowchart
  // const [items, setItems] = useState([]);
  //now we need to pass this state to the packingList component but the problem is form is not the parent of packingList so therefore we cannot use props, so how do we pass this state to the packingList component, for that we are going to use lift up state: so basically what that means is that whenever multiple sibling components need access to the same state we move that piece of state up to the first common parent component which again in our case is the App component

  // function handleAddItems(item) {
  //   setItems((items) => [...items, item]);
  // }
  //we cannot use push in above callback function because that would mutate the state and the react is all about immutability, so instead we would be needing to create a whole new array

  function handleSubmit(event) {
    event.preventDefault();
    //as soon as the submit event happens, react will call this handleSubmit function and when it does so it will pass into the function the event object so an object with all the information about the current event
    // console.log(event);

    //to start what we need to understand is that by default the input fields or select, they maintain their own state inside the DOM so basically inside the HTML element itself now this makes it hard to read their values and it also leaves this state right here in the DOM which for many reasons is not ideal. So in react we usually like to keep all this state in just one central place so inside the react application and not inside the DOM and so in order to do that we use a technique called controlled elements and so with this technique it is react who controls and owns the state of these input fields and no longer the dom, look ↑

    //let's now use these controlled elements
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    //getting to intial state after submitting the forms
    setDescription("");
    setQuantity(1);
  }

  return (
    //we used onSubmit here because we are leveraging the power of html forms in which if we hit enter then the form will get submit
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* {now are value is coming form the quantity state, the dom is no longer incharge of quantity value now, the only thing that we now have to do is to give this the ability to change itself so to basically update the state each time that we change the select value in a dom} */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          // console.log(e.target);
          // console.log(e.target.value);
        }}
        // so basically whenever we type something into the input field the change event is fired off and we can react to that event here with this onChange event handler and so in onChange we pass in the function and the function as always receives the event and then on the event we read target and e.target is basically the entire element and then .value is exactly the text that we wrote
        //so each time that we type in an input field we set the state again so we set it to the string that is currently in this input field which will then rerender the view of entire form and so then that new state of description will get placed there as the value so we always need both the value and the onChange here on the input element
      />
      <button>Add</button>
    </form>
  );
}

// so just to recap the technique of controlled elements:
//1. we define a piece of state like above the description and quantity
//2. then we use that piece of state on the element that we want to control so we basically force the element to always take the value of this state variable
//3. and then finally ofcourse, we need to update that state variable and we do so here with the onChange handler where then we set the description to the current value of that input field and so with this it is now the react who is in charge of the state and really of the entire element and so that's the reason why this technique is called controlled element

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      {/* sorting */}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go!"
          : ` 👜 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
