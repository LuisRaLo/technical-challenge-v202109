import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import Err404Page from "./pages/err/Err404Page";
import HomePage from "./pages/home/HomePage";


const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/signin" element={<SigninPage />} />



        <Route path="*" element={<Err404Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;