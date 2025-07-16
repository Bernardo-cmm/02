import React from "react";
import Router from "./Routes/router/";
import Header from "./components/Header/header.jsx";
import Footer from "./components/Footer/footer.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Router />
      <Footer />
    </div>
  );
};

export default App;
