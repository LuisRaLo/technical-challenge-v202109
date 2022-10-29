import React, { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/Authentication/AuthContext";
import SigninPage from "./pages/auth/SigninPage";
import SignUpPage from "./pages/auth/SignUpPage";
import Err404Page from "./pages/err/Err404Page";
import HomePage from "./pages/home/HomePage";
import NewsletterPage from "./pages/newsletters/NewsletterPage";
import InitialSkeletonPage from "./pages/skelletons/InitialSkeletonPage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";


const App: React.FC = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") return <InitialSkeletonPage />;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {status === "authenticated" ? (
          <Fragment>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/users" element={<UsuariosPage />} />

            <Route path="/newsletter" element={<NewsletterPage />} />

          </Fragment>
        ) : (
          <Fragment>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Fragment>
        )}
       

        <Route path="*" element={<Err404Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;