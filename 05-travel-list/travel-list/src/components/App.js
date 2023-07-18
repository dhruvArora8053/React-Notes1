import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Item from "./Items";
import Stats from "./Stats";

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
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
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

