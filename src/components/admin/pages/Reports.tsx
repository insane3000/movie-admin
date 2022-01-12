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
import { AiFillEye } from "react-icons/ai";
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
        grid-template-columns: 6.25rem calc(25% - 7.85rem) 50% 10% 5% 5% 5%;
        grid-template-rows: 100%;
        column-gap: 0.2rem;
        justify-content: center;
        align-content: center;
        &:hover {
          .cell {
            background: #1f1f20;
          }
          .image-container {
            .afuera {
              display: flex;
            }
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
        .image-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          position: relative;
          overflow: visible;
          .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .afuera {
            /* border: 0.0625rem solid white; */
            border-radius: 0.2rem;
            width: 6.25rem;
            height: auto;
            display: none;
            position: absolute;
            /* top: 4rem; */
            left: 0;
            /* top: 0; */
            background: red;
            z-index: 1;
          }
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
    .delete-window {
      width: 100%;
      height: 100%;
      background: #0c0c0c;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title-delete-window {
        font-family: "Roboto 900";
        font-size: 2.5rem;
        color: white;
        margin-bottom: 2rem;
      }
      .btns-delete-window {
        width: 30rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        /* background: red; */
        .btn {
          width: 10rem;
          height: 3rem;
          font-family: "Roboto 900";
          font-size: 2rem;
          color: white;
          background: rgb(89, 1, 231);
          border-style: none;
          outline: none;
          border-radius: 0.3rem;
          cursor: pointer;
          &:hover {
            color: #000000;
            background: rgb(255, 255, 255);
          }
        }
      }
    }
  }
`;
interface ReportIT {
  createdAt: string;
  idMovie: string;
  imageL: string;
  imageS: string;
  message: string;
  title: string;
  updatedAt: string;
  _id: string;
  user: string;
}
type Reports = [ReportIT];
const Search = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<Reports>();
  // console.log(state);
  //! Delete consfirm window state
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  // !Delete Report
  const handleDelete = async (id: string) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(() => {
        fetchData();
        setDeleteWindow(false);
      });
  };
  // !Get all Users
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/reports`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        setState(response.data.docs);
        // console.log(response);
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
  //! Remainging Days
  const daysFunction = (a: any, b: any) => {
    let day1 = a;
    let day2 = b;

    let difference = Math.abs(day2 - day1);
    let result = difference / (1000 * 3600 * 24);
    return Math.round(result);
    //     console.log(result);
  };
  return (
    <SearchSt>
      <div className="table">
        <div className="tRow sticky-top">
          <div className="cell head">img</div>
          <div className="cell head">Archivo</div>
          <div className="cell head none">Mensaje</div>
          <div className="cell head none">Usuario</div>
          {/* <div className="cell head">Pantallas</div> */}
          {/* <div className="cell head">Días restantes</div> */}
          <div className="cell head">Ver</div>
          <div className="cell head">Editar</div>
          <div className="cell head">Borrar</div>
        </div>
        {state?.map((i) => (
          <div className="tRow" key={i._id}>
            {/* <div className="cell ">{i.user}</div> */}
            {/* <div className="cell  none" style={{ textTransform: "capitalize" }}>
              {i.name}
            </div> */}
            {/* <div className="cell  center none">{i.phone}</div> */}
            {/* <div className="cell center">
              {new Date(i.date).toLocaleDateString("es-ES", options)}
            </div> */}
            {/* <div
              className="cell center  none"
              style={
                `${i.screens}` === "1"
                  ? { background: "#6200FF" }
                  : `${i.screens}` === "2"
                  ? { background: "#ff004c" }
                  : `${i.screens}` === "4"
                  ? { background: "#ffe600", color: "black" }
                  : { background: "red" }
              }
            >
              {`${i.screens}` === "1"
                ? "basic"
                : `${i.screens}` === "2"
                ? "standar"
                : `${i.screens}` === "4"
                ? "premium"
                : "error"}
            </div> */}
            {/* <div className="cell center none">{daysFunction(new Date(i.date), new Date())}</div> */}
            <div className="cell image-container">
              <img
                className="image"
                src={`${process.env.REACT_APP_BACKEND_URL}/static/posters/${i.imageS}`}
                alt=""
              />
              <img
                className="afuera"
                src={`${process.env.REACT_APP_BACKEND_URL}/static/posters/${i.imageS}`}
                alt=""
                // style={
                //   index === 15
                //     ? { bottom: "-1.75rem" }
                //     : index === 16
                //     ? { bottom: "0" }
                //     : { top: "auto", bottom: "auto" }
                // }
              />
            </div>
            <div className="cell">{i.title}</div>
            <div className="cell">{i.message}</div>
            <div className="cell">{i.user}</div>
            <Link className="cell action-btn" to={`/admin/watch-report/${i._id}`}>
              <AiFillEye />
            </Link>
            <Link className="cell action-btn " to={`/admin/update-media/${i.idMovie}`}>
              <EditIcon />
            </Link>
            <div
              className="cell action-btn"
              onClick={() => {
                setDeleteWindow(true);
                setIdToDelete(i._id);
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
      {deleteWindow && (
        <div className="delete-window">
          <h2 className="title-delete-window">¿Estás seguro de que quieres borrar...?</h2>
          <div className="btns-delete-window">
            <button type="button" className="btn" onClick={() => handleDelete(idToDelete)}>
              Si
            </button>
            <button type="button" className="btn" onClick={() => setDeleteWindow(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </SearchSt>
  );
};

export default Search;
