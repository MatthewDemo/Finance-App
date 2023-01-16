import "./App.css";
import { useEffect } from "react";
import openSocket from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setDeletedItems, getItems } from "../src/redux/slices/tickerSlise";

function App() {
  const items = useSelector((store) => store.ticker.items);
  const deletedItems = useSelector((store) => store.ticker.deletedItems);

  const dispatch = useDispatch();

  const deleteItem = (ticker) => {
    dispatch(setItems(items.filter((item) => item.ticker !== ticker)));
    dispatch(setDeletedItems([...deletedItems, ticker]));
  };

  useEffect(() => {
    const socket = openSocket("http://localhost:4000");
    socket.emit("start");
    socket.on("ticker", function (response) {
      console.log(deletedItems);
      dispatch(
        setItems(response.filter((item) => !deletedItems.includes(item.ticker)))
      );
    });
  }, [deletedItems]);


  return (
    <div className="App">
      <div className="header">
        <h1 className="headerText">Test task for InCode</h1>
      </div>

      <div className="ul-container">
        <ul>
          {items && items.map((item, idx) => (
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
      </div>
    </div>
  );
}

export default App;
