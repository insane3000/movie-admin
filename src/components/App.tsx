import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "components/admin/pages/Login";
import { Toaster } from "react-hot-toast";
// *Fonts
import "fonts/fonts.css";
import styled from "styled-components";
import Admin from "components/admin/Admin";
import Error404 from "./Error404";
import { useDispatch, useSelector } from "react-redux";
import { loginServer } from "redux/actions/appAction";
import { StoreInterface } from "interfaces/storeTemplate";

const AppSt = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0c0c0c;
  .toast {
    width: auto;
    height: 3rem;
    background: #ffffff;
    font-family: "Roboto 300";
    font-size: 1rem;
    user-select: none;
  }
`;

function App() {
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      dispatch(
        loginServer(
          `${localStorage.getItem("user")}`,
          `${localStorage.getItem("token")}`,
          `${localStorage.getItem("role")}`
        )
      );
    }
  }, [dispatch]);

  return (
    <Router>
      <AppSt id="app">
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <Routes>
          <Route path="/" element={app.login.token === "" ? <Login /> : <Navigate to="/admin" />} />
          {app.login.token !== "" && <Route path="/admin/*" element={<Admin />} />}
          <Route path="/login/*" element={<Login />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AppSt>
    </Router>
  );
}

export default App;
