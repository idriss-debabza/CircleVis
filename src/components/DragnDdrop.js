import React, { useState } from "react";

const DragAndDrop = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" }
  ]);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, index) => {
    const dragIndex = e.dataTransfer.getData("index");
    const itemsArray = [...items];
    const temp = itemsArray[dragIndex];
    itemsArray[dragIndex] = itemsArray[index];
    itemsArray[index] = temp;
    setItems(itemsArray);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id} onDrop={e => onDrop(e, index)} onDragOver={e => e.preventDefault()}>
          <div
            draggable
            onDragStart={e => onDragStart(e, index)}
            style={{ cursor: "pointer" }}
          >
            {item.text}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DragAndDrop;
