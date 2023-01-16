import "./App.css";
import { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch } from "react-redux";
import { setItems } from "../src/redux/slices/tickerSlise";
import CompanyRow from "./components/companyRow/CompanyRow";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = openSocket("http://localhost:4000");
    socket.emit("start");
    socket.on("ticker", function (response) {
      dispatch(setItems(response));
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="headerText">Test task for InCode</h1>
      </div>
      <div className="ul-container">
        <CompanyRow />
      </div>
    </div>
  );
}

export default App;
