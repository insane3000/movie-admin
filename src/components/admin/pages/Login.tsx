import React, { useState } from "react";
import styled from "styled-components";
// import axios from "axios";
// *Redux
import { useDispatch } from "react-redux";
import { loginServer } from "redux/actions/appAction";
import axios from "axios";
import { useNavigate } from "react-router";
// *Axios
// import Spinner from "./Spinner";
// import { StoreInterface } from "interfaces/storeTemplate";
//* INTERFACE APP
// import { StoreInterface } from "interfaces/storeTemplate";

const AddProductsSt = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Roboto 300";
  font-size: 2rem;
  position: relative;
  border-right: 0.0625rem solid #333333;
  position: relative;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    text-decoration: none;
    color: white;
    font-size: 2rem;
  }
  .titleAddProducts {
    width: 80%;
    height: 3rem;
    margin-bottom: 0.5rem;
    color: white;
    font-family: "Roboto 700";
    font-size: 1.5rem;
    text-align: center;
    line-height: 3rem;
    text-transform: uppercase;
    /* background: red; */
  }
  .inputValue {
    background: #050505;
    width: 80%;
    height: 3rem;
    margin-bottom: 1rem;
    outline: none;
    border-style: none;
    padding: 0 1rem;
    color: white;
    font-family: "Roboto 300";
    font-size: 1rem;
    border: 0.0625rem solid #5100ff;
    border-radius: 0.3rem;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid #5100ff;
    -webkit-text-fill-color: #ffffff71;
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  .alert {
    width: 80%;
    color: red;
    font-family: "Roboto 300";
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .btnSubmit {
    background: #4400ff;
    width: 80%;
    height: 3rem;
    margin-bottom: 0.5rem;
    outline: none;
    border-style: none;
    padding: 0 1rem;
    color: #ffffff;
    font-family: "Roboto 300";
    font-size: 1rem;
    cursor: pointer;
    border-radius: 0.3rem;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    /* width: 20rem;
    height: 25rem; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: "Roboto 300";
    font-size: 2rem;
    position: relative;
    border-right: 0.0625rem solid #333333;

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 2rem;
      text-decoration: none;
      color: white;
      font-size: 2rem;
    }
    .titleAddProducts {
      width: 80%;
      height: 3rem;
      margin-bottom: 0.5rem;
      color: white;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-align: center;
      line-height: 3rem;
      text-transform: uppercase;
      /* background: red; */
    }
    .inputValue {
      background: #050505;
      width: 20rem;
      height: 3rem;
      margin-bottom: 1rem;
      outline: none;
      border-style: none;
      padding: 0 1rem;
      color: white;
      font-family: "Roboto 300";
      font-size: 1rem;
      border: 0.0625rem solid #5100ff;
      border-radius: 0.3rem;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      border: 1px solid #5100ff;
      -webkit-text-fill-color: #ffffff71;
      -webkit-box-shadow: 0 0 0px 1000px #000 inset;
      box-shadow: 0 0 0px 1000px #000 inset;
      transition: background-color 5000s ease-in-out 0s;
    }
    .alert {
      width: 20rem;
      color: red;
      font-family: "Roboto 300";
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .btnSubmit {
      background: #4400ff;
      width: 20rem;
      height: 3rem;
      margin-bottom: 0.5rem;
      outline: none;
      border-style: none;
      padding: 0 1rem;
      color: #ffffff;
      font-family: "Roboto 300";
      font-size: 1rem;
      cursor: pointer;
      border-radius: 0.3rem;
    }
  }
`;
interface LoginIT {
  [key: string]: string | number;
  user: string;
  password: string;
}
const loginTemplate = {
  user: "",
  password: "",
};

const AddProducts = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const app = useSelector((store: StoreInterface) => store.app);

  const [login, setLogin] = useState<LoginIT>(loginTemplate);
  // const [spinner, setSpinner] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  // console.log(login);

  const handleAddProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSpinner(true);
    // console.log(login);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, login)
      .then(function (response) {
        dispatch(loginServer(response.data._id, response.data.token, response.data.role));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data._id);
        localStorage.setItem("role", response.data.role);
        navigate(`/admin/media`);
        console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        // setSpinner(false);
        setErrorUser(true);
      });
    // console.log(login);
  };
  // useEffect(() => {
  //   if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
  //     // navigate(`/admin/login`);
  //     dispatch(loginServer("", "", ""));
  //     localStorage.setItem("token", "");
  //     localStorage.setItem("user", "");
  //     localStorage.setItem("role", "");
  //   }
  // });
  return (
    <AddProductsSt onSubmit={handleSubmit}>
      <h2 className="titleAddProducts">Identificate</h2>
      <input
        className="inputValue"
        type="text"
        name="user"
        placeholder="Nombre de usuario."
        onChange={handleAddProducts}
        value={login.user}
        onFocus={(e) => e.target.select()}
        required
      />
      <input
        className="inputValue"
        type="password"
        name="password"
        placeholder="Contraseña."
        onChange={handleAddProducts}
        value={login.password}
        onFocus={(e) => e.target.select()}
        required
      />
      {errorUser && <span className="alert">Los datos son incorrectos.</span>}
      <button className="btnSubmit" type="submit">
        Entrar
      </button>
      {/* {spinner && <Spinner />} */}
    </AddProductsSt>
  );
};

export default AddProducts;
