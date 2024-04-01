import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main_page";
import TestPage from "./pages/test_page";
import Navbar from "./components/navbar/navbar";
import Product_Detail_Page from "./pages/product_detail_page";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/products/:id" element={<Product_Detail_Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
