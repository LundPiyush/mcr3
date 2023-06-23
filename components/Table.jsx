import React, { useState } from "react";
import { snacks } from "./data";

const Table = () => {
  const [snacksData, setSnacksData] = useState(snacks);
  const [sortableItems, setsortableItems] = useState(snacks);
  const [sortConfig, setSortConfig] = useState({});

  const sortedItems = () => {
    if (sortConfig !== null && sortConfig.key !== "ingredients") {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] <= b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    } else if (sortConfig.key === "ingredients") {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key][0] <= b[sortConfig.key][0]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key][0] > b[sortConfig.key][0]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    setSortConfig({ key, direction });
    sortedItems();
  };

  const inputChangeHandler = (serachText) => {
    const inputFilter = snacksData?.filter(({ product_name, ingredients }) => {
      return product_name.toLowerCase().includes(serachText.toLowerCase());
    });
    setsortableItems(inputFilter);
  };

  return (
    <div>
      <h1>Snack Table- click twice on button to sort the data</h1>
      <input type="text" onChange={(e) => inputChangeHandler(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => requestSort("id")}>Sr.No</button>
            </th>
            <th>
              <button onClick={() => requestSort("product_name")}>Name</button>
            </th>
            <th>
              <button onClick={() => requestSort("product_weight")}>
                Weight
              </button>
            </th>
            <th>
              <button onClick={() => requestSort("price")}>Price</button>
            </th>
            <th>
              <button type="button" onClick={() => requestSort("calories")}>
                Calories
              </button>
            </th>
            <th>
              <button onClick={() => requestSort("ingredients")}>
                Ingredients
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortableItems.map((snack) => {
            const {
              id,
              product_name,
              product_weight,
              price,
              calories,
              ingredients,
            } = snack;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{product_name}</td>
                <td>{product_weight}</td>
                <td>{price}</td>
                <td>{calories}</td>
                <td>{ingredients.map((ing) => ing + ",")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
