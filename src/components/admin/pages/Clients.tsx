import axios from "axios";
import { StoreInterface } from "interfaces/storeTemplate";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
// *Icons
import EditIcon from "icons/EditIcon";
import DeleteIcon from "icons/DeleteIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
import { loginServer } from "redux/actions/appAction";
// *React Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import Spinner from "components/Spinner";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
// *Images
import UserLogo from "img/user.png";
const MediaSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 7rem calc(100% - 7rem);

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
const DashboardSt = styled.form`
  width: 100%;
  height: 7rem;
  font-family: "Roboto 100";
  font-size: 2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.0625rem solid #333333;
  display: grid;
  grid-template-columns: 7.5% 15% 10% 19rem calc(57.5% - 27rem) 10%;
  grid-template-rows: 100%;
  gap: 1rem;
  position: relative;
  justify-content: center;
  align-content: center;
  .cell-label-input {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      font-family: "Roboto 300";
      font-size: 1rem;
      color: #929292;
      text-align: center;
    }
    .select-arrow {
      width: 100%;
      height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 0.3rem;
      background: #000000;

      .sysIconArrowSelect {
        position: absolute;
        right: 1rem;
        color: #ffffff;
        transform: rotate(90deg);
      }

      .input {
        width: 100%;
        height: 100%;
        background: none;
        border-style: none;
        outline: none;
        padding: 0 1rem;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        color: white;
        position: relative;
        // !Hiden arrow
        -webkit-appearance: none;
        appearance: none;
        option {
          background: #121312;
          font-family: "Roboto 300";
          font-size: 1.5rem;
          color: white;
          /* padding: 1rem 1rem; */
        }
      }
    }
    .inputOnly {
      border-style: none;
      outline: none;
      text-align: center;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: white;
      /* background: none; */
    }
    .search {
      border-style: none;
      outline: none;
      text-align: start;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: white;
      padding: 0 1rem;
      /* background: none; */
    }
    .pagination {
      /* background: red; */
      background: none;
      display: grid;
      grid-template-columns: repeat(5, 3.5rem);
      grid-template-rows: 3.5rem;
      justify-content: space-evenly;
      align-content: center;
      .btn {
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3rem;
        background: #5901e7;
        outline: none;
        border-style: none;
        overflow: hidden;
        color: white;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        cursor: pointer;
        &:hover {
          background: #ffffff;
          color: black;
          transition: none.1s;
        }
        .sysIconArrow {
          width: 100%;
          height: 100%;
          padding: 0.8rem;
        }
      }
    }
    .addMedia {
      background: #5901e7;
      border-radius: 0.3rem;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background: #ffffff;
        color: #000000;
      }
    }
  }
`;

const TableSt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 2rem;
  row-gap: 0.2rem;
  overflow-y: scroll;
  position: relative;
  border-bottom: 0.0625rem solid #333333;
  overflow: visible;
  .tRow {
    display: grid;
    grid-template-columns: 4% calc(15% - 2rem) 16% 10% 20% 15% 10% 5% 5%;
    grid-template-rows: 100%;
    column-gap: 0.2rem;
    justify-content: center;
    align-content: center;

    &:hover {
      .cell {
        background: #1c1c1d;
      }
      .image-container {
        .afuera {
          display: flex;
        }
      }
      .head {
        background: #000000;
      }
      .sort {
        /* background: #ffffff;
        color: black; */
        cursor: pointer;
      }
      .action-btn {
        background: #5901e7;
      }
    }
    .cell {
      background: #141414;
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
        right: 0;
        bottom: 0;
        /* background: red; */
        z-index: 1;
      }
    }
    .head {
      background: #000000;
      font-family: "Roboto 300";
      font-size: 1rem;
      text-align: center;
      color: #ffffff;
    }
    .sort {
      font-family: "Roboto 900";
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
      text-transform: capitalize;
    }
    .none {
      display: block;
    }
  }
  //! Para mantener pegado los titulos
  .sticky-top {
    position: sticky;
    top: 0;
    background: #0d0d0e;
  }
`;
const PlayerSt = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000000d8;
  display: flex;
  justify-content: center;
  align-items: center;
  .close {
    background: #ffffff;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 2rem;
    top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
    .sysIconClose {
      width: 60%;
      height: 60%;
      font-size: 2rem;
    }
  }
  .player {
    width: 80%;
    height: auto;
    max-height: 90%;
    background: black;
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
  screens: "";
  imageXL: "";
  imageL: "";
  imageM: "";
  imageS: "";
}
type Movies = [MovieIT];
const Search = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<Movies>();
  // !Params states
  const [pageState, setPageState] = useState<any>();
  const [folder, setFolder] = useState<any>(" *");
  const [available, setAvailable] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [docs, setDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortQuery, setSortQuery] = useState<any>("createdAt");
  const [ascDesc, setAscDesc] = useState<any>("desc");
  //!Spinner
  const [spinner, setSpinner] = useState(false);
  //! Delete consfirm window state
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  //!Player
  const [playerModal, setPlayerModal] = useState(false);
  const [linkModal, setLinkModal] = useState("");
  // !Handle Pagination
  const handlePrevious = (number: number) => {
    navigate(
      `/admin/clients?page=${
        parseInt(pageState) - number
      }&folder=${folder}&title=${title}&available=${available}&sortQuery=${sortQuery}&ascDesc=${ascDesc}`
    );
  };
  const handleNext = (number: number) => {
    navigate(
      `/admin/clients?page=${
        parseInt(pageState) + number
      }&folder=${folder}&title=${title}&available=${available}&sortQuery=${sortQuery}&ascDesc=${ascDesc}`
    );
  };
  // !Handle Change Folder
  //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const value = e.currentTarget.value;
  //     let sortQueryLocal = "title";
  //     let ascDescLocal = "asc";
  //     setFolder(value);
  //     navigate(
  //       `/admin/clients?page=1&folder=${value}&title=${title}&available=${available}&sortQuery=${sortQueryLocal}&ascDesc=${ascDescLocal}`
  //     );
  //   };
  // !Handle Change Available
  //   const handleAvailable = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const value = e.currentTarget.value;
  //     setAvailable(value);

  //     //     console.log(value);
  //     navigate(
  //       `/admin?page=1&folder=${folder}&title=${title}&available=${value}&sortQuery=${sortQuery}&ascDesc=${ascDesc}`
  //     );
  //   };
  // !Fetching Function
  const fetchData = (
    pageParams: any,
    folderParams: any,
    titleParams: any,
    availableParams: any,
    sortQueryParams: any,
    ascDescParams: any
  ) => {
    setSpinner(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/clients?page=${pageParams}&limit=17&folder=${folderParams}&title=${titleParams}&available=${availableParams}&sortQuery=${sortQueryParams}&ascDesc=${ascDescParams}`,
        {
          headers: {
            authorization: `Bearer ${app.login.token}`,
            id: `${app.login.user}`,
            role: `${app.login.role}`,
          },
        }
      )
      .then(function (response: any) {
        setState(response.data.docs);
        setTotalPages(response.data.totalPages);
        setDocs(response.data.totalDocs);
        // console.log(response);
        setSpinner(false);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParams = params.get("page") ? params.get("page") : 1;
    const folderParams = params.get("folder") ? params.get("folder") : "";
    const titleParams = params.get("title") ? params.get("title") : "";
    const availableParams = params.get("available") ? params.get("available") : "true";
    const sortQueryParams = params.get("sortQuery") ? params.get("sortQuery") : "createdAt";
    const ascDescParams = params.get("ascDesc") ? params.get("ascDesc") : "desc";

    setPageState(pageParams);
    setFolder(folderParams);
    setTitle(titleParams);
    setAvailable(availableParams);
    setSortQuery(sortQueryParams);
    setAscDesc(ascDescParams);

    // !Fetching Data whit params
    fetchData(
      pageParams,
      folderParams,
      titleParams,
      availableParams,
      sortQueryParams,
      ascDescParams
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, folder]);

  // ! Logica para buscar **********************************
  const timerRef = useRef<any>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTitle(value);
    //     setPageState("1");
    clearTimeout(timerRef.current);
    if (title.length >= 1) {
      timerRef.current = setTimeout(
        () =>
          navigate(`/admin/clients?page=1&folder=${folder}&title=${value}&available=${available}`),
        500
      );
    }
  };

  // !toast
  const deleted = () => toast.success("Borrado.");
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
        navigate(`/admin/clients?page=${pageState}&folder=${folder}&title=${title}`);
        deleted();
        setDeleteWindow(false);
        // console.log("recargar de nuevo");
      });
  };
  // !funtions to change sorting
  const sortQueryFunction = (value: string) => {
    setSortQuery(value);
    let ascDescLocal = ascDesc === "asc" ? "desc" : "asc";
    navigate(
      `/admin/clients?page=1&folder=${folder}&title=${title}&available=${available}&sortQuery=${value}&ascDesc=${ascDescLocal}`
    );
    console.log(value);
  };
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
    <MediaSt>
      {/* <DashboardSt onSubmit={handleSubmit}> */}
      <DashboardSt>
        <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Clientes
          </label>
          <input className="select-arrow inputOnly" type="text" value={docs} readOnly />
        </section>

        {/* <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Carpeta
          </label>
          <div className="select-arrow">
            <ArrowRightIcon className="sysIconArrowSelect" />
            <select
              className="input"
              name="genre"
              id="genre"
              value={folder}
              onChange={handleChange}
            >
              <option value="0">Todas</option>
              <option value="0">Basic</option>
              <option value="2">Standar</option>
              <option value="4">Premium</option>
            </select>
          </div>
        </section> */}
        <div></div>
        {/* <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Disponible
          </label>
          <div className="select-arrow">
            <ArrowRightIcon className="sysIconArrowSelect" />
            <select
              className="input"
              name="available"
              id="available"
              value={available}
              onChange={handleAvailable}
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </section> */}
        <div></div>

        <section className="cell-label-input">
          <label className="label" htmlFor="">
            P??ginas: {totalPages}
          </label>

          <section className="select-arrow pagination">
            <button
              type="button"
              className="btn arrow"
              title="Primera p??gina"
              onClick={() => handlePrevious(pageState - 1)}
              style={
                pageState <= 1
                  ? { opacity: "0", cursor: "initial" }
                  : { display: "flex", cursor: "pointer" }
              }
              disabled={pageState <= 1 ? true : false}
            >
              <MdFirstPage className="sysIconArrow" />
            </button>

            <button
              type="button"
              className="btn text"
              title="P??gina anterior"
              onClick={() => handlePrevious(1)}
              style={
                pageState <= 1
                  ? { opacity: "0", cursor: "initial" }
                  : { display: "flex", cursor: "pointer" }
              }
              disabled={pageState <= 1 ? true : false}
            >
              <MdKeyboardArrowLeft className="sysIconArrow" />
            </button>

            <button type="button" className="btn text">
              {pageState}
            </button>

            <button
              type="button"
              className="btn text"
              title="Siguiente p??gina"
              onClick={() => handleNext(1)}
              style={
                pageState >= totalPages
                  ? { opacity: "0", cursor: "initial" }
                  : { display: "flex", cursor: "pointer" }
              }
              disabled={pageState >= totalPages ? true : false}
            >
              <MdKeyboardArrowRight className="sysIconArrow" />
            </button>

            <button
              type="button"
              className="btn arrow"
              title="??ltima pagina"
              onClick={() => handleNext(totalPages - pageState)}
              style={
                pageState >= totalPages
                  ? { opacity: "0", cursor: "initial" }
                  : { display: "flex", cursor: "pointer" }
              }
              disabled={pageState >= totalPages ? true : false}
            >
              <MdLastPage className="sysIconArrow" />
            </button>
          </section>
        </section>

        <section className="cell-label-input">
          <label className="label">Buscar</label>
          <input
            className="select-arrow search"
            type="text"
            value={title}
            onChange={handleSearch}
          />
        </section>

        <section className="cell-label-input">
          <label className="label" htmlFor="genre"></label>
          <Link className="select-arrow addMedia" to="/admin/create-user">
            Crear
          </Link>
        </section>
      </DashboardSt>
      <TableSt>
        <div className="tRow sticky-top">
          <div
            className="cell head sort"
            onClick={() => sortQueryFunction("createdAt")}
            style={sortQuery === "createdAt" ? { background: "#5901E7" } : { background: "black" }}
          >
            #
          </div>

          <div
            className="cell head sort"
            onClick={() => sortQueryFunction("user")}
            style={sortQuery === "user" ? { background: "#5901E7" } : { background: "black" }}
          >
            Usuario
          </div>
          <div className="cell head" title="Disponible">
            Nombre
          </div>
          <div className="cell head" title="Calificaci??n">
            Celular
          </div>
          <div className="cell head">Fecha de vencimiento</div>
          <div className="cell head">Pantallas</div>
          <div className="cell head">Dias restantes</div>
          <div className="cell head">Editar</div>
          <div className="cell head">Borrar</div>
        </div>
        {state?.map((i) => (
          <div className="tRow" key={i._id}>
            <div className="cell image-container">
              <img
                className="image"
                src={
                  i.imageS === ""
                    ? UserLogo
                    : `${process.env.REACT_APP_BACKEND_URL}/static/posters/${i.imageS}`
                }
                alt=""
              />
              <img
                className="afuera"
                src={
                  i.imageS === ""
                    ? UserLogo
                    : `${process.env.REACT_APP_BACKEND_URL}/static/posters/${i.imageS}`
                }
                alt=""
              />
            </div>
            <div className="cell ">{i.user}</div>
            <div className="cell">{i.name}</div>
            <div className="cell center">{i.phone}</div>
            <div className="cell ">{new Date(i.date).toLocaleDateString("es-ES", options)}</div>
            <div
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
            </div>

            <div className="cell center none">{daysFunction(new Date(i.date), new Date())}</div>

            <Link className="cell action-btn " to={`/admin/update-user/${i._id}`}>
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
        {spinner && <Spinner />}
      </TableSt>

      {playerModal && (
        <PlayerSt>
          <div className="close" onClick={() => setPlayerModal(false)}>
            <IoCloseOutline className="sysIconClose" />
          </div>
          <video className="player" controls>
            <source src={linkModal} type="video/mp4" />
          </video>
        </PlayerSt>
      )}

      {deleteWindow && (
        <div className="delete-window">
          <h2 className="title-delete-window">??Est??s seguro de que quieres borrar...?</h2>
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
    </MediaSt>
  );
};

export default Search;
