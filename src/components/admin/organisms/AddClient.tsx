import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// *Icons
import HashIcon from "icons/HashIcon";
import CloseIcon from "icons/CloseIcon";
import { StoreInterface } from "interfaces/storeTemplate";
import { useSelector } from "react-redux";
const CreateUserSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    justify-content: center;
    align-items: center;

    .titleCreateUser {
      font-family: "Roboto 900";
      font-size: 2rem;
      margin-bottom: 2rem;
      text-transform: uppercase;
    }

    .createUserForm {
      background: #0a0a0a;
      width: 25rem;
      height: 35rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      position: relative;
      .containerUserName {
        width: 80%;
        height: 3rem;
        /* background: #ffffff; */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        border-radius: 0.3125rem;
        overflow: hidden;
        .cellInputName {
          width: calc(100% - 3rem);
          height: 3rem;
          color: white;
          outline: none;
          border-style: none;
          color: black;
          background: white;
          padding: 0 1rem;
          font-family: "Roboto 300";
          font-size: 1rem;
          /* text-transform: uppercase; */
        }
        .hashIcon {
          width: 3rem;
          height: 3rem;
          background: #3c00ff;
          color: white;
          /* border-radius: 0.3rem; */
          padding: 0.5rem;
          cursor: pointer;
          user-select: none;
          &:hover {
            background: #000000;
            color: white;
          }
        }
      }
      .cellInput {
        width: 80%;
        height: 3rem;
        background: white;
        color: white;
        outline: none;
        border-style: none;
        margin-bottom: 1rem;
        color: black;
        border-radius: 0.3rem;
        padding: 0 1rem;
        font-family: "Roboto 300";
        font-size: 1rem;
        text-transform: uppercase;
      }
      .profile {
        text-transform: none;
      }
      .submit {
        font-family: "Roboto 900";
        font-size: 1rem;
        cursor: pointer;
        transition: 0.1s;
        background: #3c00ff;
        color: white;

        &:hover {
          background: #ffffff;
          color: #000000;
          transition: 0.1s;
        }
      }
      .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .sysIconClose {
          width: 100%;
          height: 100%;
          color: white;
        }
      }
    }
  }
`;
interface User {
  user: string;
  password: string;
  name: string;
  phone: string;
  date: string;
  role: string;
}
const CreateUser = () => {
  let navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<User>({
    user: "",
    password: "",
    name: "",
    phone: "",
    date: `${formatDate(Date.now())}`,
    role: "user",
  });
  //! funcion para formatiear la fecha
  function formatDate(data: number) {
    return new Date(data - 1000 * 60 * 60 * 4).toISOString().substring(0, 16);
  }
  //! funcion para crear un hash o nombre aleatorio
  function makeid(length: number) {
    var result = "";
    var characters = "abcdefghjklmnpqrstuvwxyz123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleCreateUser = () => {
    setState({
      ...state,
      password: makeid(5),
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    let type = e.target.type;

    setState({
      ...state,
      [name]: type === "datetime-local" ? formatDate(new Date(value).getTime()) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formatToSave: any = new Date(state.date);
    state.date = formatToSave;
    state.name = state.name.toLowerCase();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/client-signup`, state, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        console.log(response);
        navigate("/admin/clients");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <CreateUserSt>
      <form className="createUserForm" onSubmit={handleSubmit}>
        <h2 className="titleCreateUser">Crear Usuario</h2>
        <input
          name="user"
          className="cellInput profile"
          type="text"
          value={state.user}
          onChange={handleChange}
          placeholder="Usuario"
        />
        <div className="containerUserName">
          <input
            name="password"
            className="cellInputName"
            type="text"
            value={state.password}
            onChange={handleChange}
            required
        //     maxLength={5}
            placeholder="Contraseña"
          />
          <HashIcon className="hashIcon" onClick={handleCreateUser} />
        </div>
        <input
          name="name"
          className="cellInput profile"
          type="text"
          value={state.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="phone"
          className="cellInput profile"
          type="number"
          value={state.phone}
          onChange={handleChange}
          placeholder="Celular"
        />
        <input
          name="date"
          className="cellInput"
          type="datetime-local"
          value={state.date}
          onChange={handleChange}
        />
        <input className="cellInput submit" type="submit" value="CREAR" />
        <Link className="close" to="/admin/clients">
          <CloseIcon className="sysIconClose" />
        </Link>
      </form>
    </CreateUserSt>
  );
};

export default CreateUser;
