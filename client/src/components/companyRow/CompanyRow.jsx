import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setDeletedItems } from "../../redux/slices/tickerSlise";

const CompanyRow = () => {
  const items = useSelector((store) => store.ticker.items);
  const deletedItems = useSelector((store) => store.ticker.deletedItems);
  const dispatch = useDispatch();

  const deleteItem = (ticker) => {
    dispatch(setItems(items.filter((item) => item.ticker !== ticker)));
    dispatch(setDeletedItems([...deletedItems, ticker]));
  };

  return (
    <ul>
      {items &&
        items.map((item, idx) => (
          <div key={idx} className="item-container">
            <li className="item-info">
              <div className="logo">{item.ticker}</div>
              <div className="price">{item.price} $ </div>
              <div className="change">+{item.yield} $</div>
              <div className="change_percent">↑ {item.change_percent} %</div>
              <div className="svgBtn">
                <img
                  className="deleteBtn"
                  src="https://cdn-icons-png.flaticon.com/512/992/992660.png"
                  alt="close"
                  onClick={(e) => {
                    deleteItem(
                      e.target.parentNode.parentNode.firstChild.textContent
                    );
                  }}
                />
              </div>
            </li>
          </div>
        ))}
    </ul>
  );
};

export default CompanyRow;
