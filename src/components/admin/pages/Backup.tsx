import axios from "axios";
import { StoreInterface } from "interfaces/storeTemplate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "components/Spinner";
// *Icons
import { IoCloudDownloadOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
const BackupSt = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
const DashboardSt = styled.div`
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
  grid-template-columns: calc(80% - 10rem) 10% 10%;
  grid-template-rows: 100%;
  gap: 1rem;
  position: relative;
  justify-content: space-evenly;
  align-content: center;
  .title-backups {
    font-family: "Roboto 900";
    font-size: 2.5rem;
    color: #ffffff;
  }
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
    .input {
      background: #000000;
      width: 100%;
      height: 3.5rem;
      outline: none;
      border-style: none;
      border-radius: 0.3rem;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: #ffffff;
      text-align: center;
    }

    .buttonMakeBackup {
      width: 100%;
      height: 3.5rem;
      background: #5901e7;
      border-radius: 0.3rem;
      font-family: "Roboto 900";
      font-size: 1.5rem;
      padding: 0 1rem;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border-style: none;
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
  .tRow {
    display: grid;
    grid-template-columns: calc(30% - 1.5rem) 30% 20% 10% 10%;
    grid-template-rows: 100%;
    column-gap: 0.2rem;
    justify-content: center;
    align-content: center;
    &:hover {
      .cell {
        background: #1c1c1d;
      }
      .head {
        background: #000000;
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
      /* background: red; */

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

interface BackupIT {
  _id: string;
  file: string;
  bucket: string;
  link: string;
  updatedAt: string;
  createdAt: string;
}
type Backups = [BackupIT];
const Backup = () => {
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<Backups>();
  const [totalDocs, setTotalDocs] = useState(0);
  const [spinner, setSpinner] = useState(false);

  //! Delete consfirm window state
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  // !Fetching Function
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/backup`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        setState(response.data.docs);
        setTotalDocs(response.data.totalDocs);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Make Backup
  const handleMakeBackup = async () => {
    setSpinner(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/backup`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setSpinner(false);
          fetchData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // !Delete Backup
  const handleDelete = async (id: string) => {
    setSpinner(true);
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/backup/${id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          fetchData();
          setDeleteWindow(false);
          setSpinner(false);
        }
      });
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

  return (
    <BackupSt>
      <DashboardSt>
        <h2 className="title-backups">COPIAS DE SEGURIDAD</h2>
        <section className="cell-label-input">
          <label className="label">Backups</label>
          <input className="select-arrow input" type="text" value={totalDocs} readOnly />
        </section>

        <section className="cell-label-input">
          <label className="label"></label>
          <button type="button" className="buttonMakeBackup" onClick={handleMakeBackup}>
            Backup
          </button>
        </section>
      </DashboardSt>
      <TableSt>
        <div className="tRow sticky-top">
          <div className="cell head" title="Disponible">
            Fecha
          </div>
          <div className="cell head">Nombre</div>
          <div className="cell head" title="Calificación">
            Bucket
          </div>
          <div className="cell head">Descargar</div>
          <div className="cell head">Borrar</div>
        </div>
        {state?.map((i) => (
          <div className="tRow" key={i._id}>
            <div className="cell ">
              {new Date(i.createdAt).toLocaleDateString("es-ES", options)}
            </div>
            <div className="cell ">{i.file}</div>
            <div className="cell ">{i.bucket}</div>
            <a className="cell action-btn" href={i.link}>
              <IoCloudDownloadOutline />
            </a>

            <section
              className="cell action-btn"
              onClick={() => {
                setDeleteWindow(true);
                setIdToDelete(i._id);
              }}
            >
              <AiOutlineDelete />
            </section>
          </div>
        ))}
      </TableSt>
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
      {spinner && <Spinner />}
    </BackupSt>
  );
};

export default Backup;
