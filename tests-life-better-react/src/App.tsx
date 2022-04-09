import React from "react";
import OrderPage from "./pages/order";
import Header from "./components/Header";
import "primeflex/primeflex.css";

function App() {
  return (
    <div className="App">
      <Header />
      <OrderPage />
    </div>
  );
}

export default App;
