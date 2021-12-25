import axios from "axios";
import { StoreInterface } from "interfaces/storeTemplate";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
// *Icons
import EditIcon from "icons/EditIcon";
import DeleteIcon from "icons/DeleteIcon";
const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .addMedia {
      width: 5rem;
      height: 5rem;
      background: #1b1b1b55;
      position: absolute;
      /* right: 1rem; */
      bottom: 1rem;
      border-radius: 100%;
      font-family: "Roboto 100";
      font-size: 4rem;
      color: #ffffff8b;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background: #5901e7;
        color: #ffffff;
      }
    }
    .table {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-auto-rows: 2rem;
      row-gap: 0.2rem;
      overflow-y: scroll;
      position: relative;
      .tRow {
        display: grid;
        grid-template-columns: calc(20% - 1.2rem) 20% 20% 20% 10% 10%;
        grid-template-rows: 100%;
        column-gap: 0.2rem;
        justify-content: center;
        align-content: center;
        &:hover {
          .cell {
            background: #1f1f20;
          }
          .head {
            background: #000000;
          }
          .action-btn {
            background: #5901e7;
          }
        }
        .cell {
          background: #121213;
          line-height: 2rem;
          display: block;
          border-radius: 0.3rem;
          font-family: "Roboto 300";
          font-size: 1rem;
          color: white;
          padding: 0 1rem;
          // Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .head {
          background: #000000;
          font-family: "Roboto 900";
          font-size: 1rem;
          text-align: center;
          color: #ffffff;
        }

        .action-btn {
          background: #5901e7;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.1rem;
          &:hover {
            background: #ffffff;
            color: #000000;
          }
        }
        .center {
          text-align: center;
        }
        .none {
          display: block;
        }
      }
      //! Para mantener pegado los titulos
      .sticky-top {
        position: sticky;
        top: 0;
        background: #0e0c16;
      }
    }
  }
`;
interface MovieIT {
  _id: "";
  user: "";
  password: "";
  name: "";
  phone: "";
  date: "";
  role: "";
}
type Movies = [MovieIT];
const Search = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<Movies>();
  // console.log(state);
  // !Delete User
  const handleDelete = async (id: string) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/client-delete/${id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(() => {
        fetchData();
      });
  };
  // !Get all Users
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/clients`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // history.push(`/admin/login`);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return (
    <SearchSt>
      <div className="table">
        <div className="tRow sticky-top">
          <div className="cell head">Clave</div>
          <div className="cell head none">Nombre</div>
          <div className="cell head none">Celular</div>
          <div className="cell head">Fecha de vencimiento</div>

          <div className="cell head">Editar</div>
          <div className="cell head">Borrar</div>
        </div>
        {state?.map((i) => (
          <div className="tRow" key={i._id}>
            <div className="cell center">{i.user}</div>

            <div className="cell  none">{i.name}</div>
            <div className="cell  none">{i.phone}</div>
            <div className="cell center">
              {new Date(i.date).toLocaleDateString("es-ES", options)}
            </div>
            <Link className="cell action-btn" to={`/admin/update-user/${i._id}`}>
              <EditIcon />
            </Link>
            <div className="cell action-btn" onClick={() => handleDelete(i._id)}>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
      <Link className="addMedia" to="/admin/create-user">
        +
      </Link>
    </SearchSt>
  );
};

export default Search;
