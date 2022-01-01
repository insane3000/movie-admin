import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreInterface } from "interfaces/storeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loginServer } from "redux/actions/appAction";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
// *Icon
// import CopyIcon from "icons/CopyIcon";
import { IoIosCopy } from "react-icons/io";
const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;

    .poster {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 90%;
        height: 100%;
        align-items: center;
        object-fit: contain;
      }
    }
    .data-right {
      width: 75%;
      height: 100%;
      overflow-y: scroll;
      .id-title {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
        position: relative;

        .id {
          width: auto;
          height: 3rem;
          line-height: 3rem;
          position: absolute;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: none;
          border-radius: 0.3rem;
          padding: 0 1rem;
          border: 0.0625rem solid #5901e7;

          .text {
            width: auto;
            height: 3rem;
            line-height: 3rem;
            font-family: "Roboto 300";
            color: #ffffff;
            font-size: 1rem;
            margin-right: 0.5rem;
          }
          .icon {
            width: 2rem;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            cursor: pointer;
            user-select: none;
            :hover {
              color: #5901e7;
            }
            :active {
              color: #3c009c;
            }
          }
        }
        .title {
          text-align: center;
          color: white;
          font-family: "Roboto 900";
          font-size: 3rem;
          text-transform: capitalize;
        }
      }
      .upload-form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        // ! Estilos para la zona de title
        .container-inputs {
          width: 100%;
          height: 3rem;
          display: grid;
          grid-template-columns: 15% 35% 25% calc(15% - 4rem) 10%;
          grid-template-rows: 100%;
          gap: 1rem;
          justify-content: center;
          align-content: center;
          margin-bottom: 2rem;
          .input-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border: 0.0625rem solid #5901e7;
            border-radius: 0 0.3rem 0.3rem 0.3rem;
            .label {
              background: #5901e7;
              border-radius: 0.3rem 0.3rem 0 0;
              position: absolute;
              left: -0.0625rem;
              top: -1.3rem;
              font-family: "Roboto 300";
              font-size: 1rem;
              color: #ffffff;
              padding: 0 0.5rem;
            }
            .input-form {
              width: 100%;
              height: 100%;
              border-style: none;
              outline: none;
              padding: 0 1rem;
              background: none;
              color: white;
              font-family: "Roboto 300";
              font-size: 1rem;
            }
            .select {
              width: 90%;
              height: 100%;
              /* background: red; */
              option {
                color: #000000;
              }
            }
          }
        }
        .input-form-container-l {
          width: 100%;
          height: 3rem;
          position: relative;
          border-radius: 0 0.3rem 0.3rem 0.3rem;
          border: 0.0625rem solid #5901e7;
          margin-bottom: 2rem;
          .label {
            background: #5901e7;
            border-radius: 0.3rem 0.3rem 0 0;
            position: absolute;
            left: -0.0625rem;
            top: -1.2rem;
            font-family: "Roboto 300";
            font-size: 1rem;
            color: #ffffff;
            padding: 0 0.5rem;
          }
          .inputs-l {
            justify-self: center;
            align-self: center;
            width: 100%;
            height: 100%;
            border-style: none;
            outline: none;
            padding: 1rem 1rem;
            margin-bottom: 0.5rem;
            background: none;
            color: white;
            font-family: "Roboto 300";
            font-size: 1rem;
          }
        }

        .text-area {
          height: 8rem;
          .inputs-l {
            resize: none;
          }
        }
        .container-inputs02 {
          /* background: #bdb0b0; */
          width: 100%;
          height: 4rem;
          display: grid;
          grid-template-columns: 7.5% calc(80% - 2rem) 12.5%;
          grid-template-rows: 100%;
          gap: 1rem;
          justify-content: center;
          align-content: center;
          margin-bottom: 2rem;
          .input-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border: 0.0625rem solid #5901e7;
            border-radius: 0 0.3rem 0.3rem 0.3rem;
            .label {
              background: #5901e7;
              border-radius: 0.3rem 0.3rem 0 0;
              position: absolute;
              left: -0.0625rem;
              top: -1.2rem;
              font-family: "Roboto 300";
              font-size: 1rem;
              color: #ffffff;
              padding: 0 0.5rem;
            }
            .input-form {
              justify-self: center;
              align-self: center;
              width: 100%;
              height: 100%;
              border-style: none;
              outline: none;
              padding: 0 1rem;
              border-radius: 0.3rem;
              background: none;
              color: white;
              font-family: "Roboto 300";
              font-size: 1rem;
              line-height: 4rem;
            }
            .select {
              width: 90%;
              height: 100%;
              /* background: red; */
              option {
                color: #000000;
              }
            }
          }
        }
        .save-btn {
          /* width: 15rem;
        height: 4rem; */

          border-style: none;
          outline: none;
          padding: 0.5rem 2rem;
          border-radius: 0.3rem;
          font-family: "Roboto 900";
          font-size: 2rem;
          /* line-height: 4rem; */
          cursor: pointer;
          transition: 0.1s;
          background: #5901e7;
          color: white;
          text-decoration: none;
          margin-left: 1rem;
          margin-right: 1rem;

          &:hover {
            transition: 0.1s;
            background: #ffffff;
            color: #000000;
          }
        }
      }
    }
  }
`;
const Search = () => {
  //   const fileRef = useRef<any>();
  const params = useParams();
  let navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);
  const [id, setID] = useState("");
  const [imageL, setImageL] = useState("");
  const [imageM, setImageM] = useState("");
  const [imageS, setImageS] = useState("");

  const [language, setLanguage] = useState("latino");
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [actors, setActors] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState<any>(0);
  const [file, setFile] = useState<any>();
  const [available, setAvailable] = useState<any>(true);
  // !Funtion To Capitalize first letter
  function capitalizarPrimeraLetra(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // !Handle Change inputs
  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setLanguage(value);
  };
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTitle(capitalizarPrimeraLetra(value));
  };
  const handleOriginalTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setOriginalTitle(capitalizarPrimeraLetra(value));
  };

  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setYear(value);
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTime(value);
  };
  const handleActors = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setActors(value);
  };
  const handleGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setGenre(value);
  };
  const handleSynopsis = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value;
    setSynopsis(value);
  };
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setRating(value);
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files?.[0];
    setFile(value);
  };
  const handleAvailable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value === "true" ? true : false;
    setAvailable(value);
  };
  // console.log(available);
  // !Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("language", language);
    formData.append("title", title);
    formData.append("originalTitle", originalTitle);
    formData.append("year", year);
    formData.append("time", time);
    formData.append("actors", actors);
    formData.append("genre", genre);
    formData.append("synopsis", synopsis);
    formData.append("rating", rating);
    formData.append("file", file);
    formData.append("available", available);
    // !For delete previous images
    formData.append("imageL", imageL);
    formData.append("imageM", imageM);
    formData.append("imageS", imageS);
    //     console.log(formData)
    await axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/series/${params.id}`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          navigate(-1);
          edited();
        }
      });
  };
  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/series/${params.id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        //TODO Por cada nuevo dato seteado, se renderiza de nuevo. fixear!!!
        setLanguage(response.data.language);
        setTitle(response.data.title);
        setOriginalTitle(response.data.originalTitle);
        setRating(response.data.rating);
        setYear(response.data.year);
        setGenre(response.data.genre);
        setTime(response.data.time);
        setActors(response.data.actors);
        setSynopsis(response.data.synopsis);
        setAvailable(response.data.available);
        //! For delete previous images
        setImageL(response.data.imageL);
        setImageM(response.data.imageM);
        setImageS(response.data.imageS);
        setID(response.data._id);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        // dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // !toast
  const edited = () => toast.success("Editado.");
  const copied = () => toast.success("Copiado!");
  // !Copy function
  const copyToClipboard = () => {
    copied();
  };

  return (
    <SearchSt>
      <div className="poster">
        <img src={imageL && `${process.env.REACT_APP_BUCKET_SERIES}${imageL}`} alt="" />
      </div>
      <div className="data-right">
        <div className="id-title">
          <div className="id">
            <section className="text">ID: {id}</section>
            <CopyToClipboard text={id}>
              <IoIosCopy className="icon" onClick={copyToClipboard} />
            </CopyToClipboard>
          </div>
          <h2 className="title">Actualizar peliculas</h2>
        </div>
        <form className="upload-form" onSubmit={handleSubmit}>
          <section className="container-inputs">
            <div className="input-form-container">
              <span className="label">Idioma:</span>
              <select
                value={language}
                className="input-form select"
                name="server"
                onChange={(e) => handleLanguage(e)}
              >
                <option value="latino">Latino</option>
                <option value="subtitulado">Subtitulado</option>
              </select>
            </div>

            <div className="input-form-container">
              <span className="label">Título:</span>
              <input
                name="title"
                className="input-form"
                type="text"
                onChange={(e) => handleTitle(e)}
                placeholder="Título"
                value={title}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Título original:</span>
              <input
                name="originalTitle"
                className="input-form"
                type="text"
                onChange={(e) => handleOriginalTitle(e)}
                placeholder="Título original"
                value={originalTitle}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Año:</span>
              <input
                name="year"
                className="input-form"
                type="text"
                onChange={(e) => handleYear(e)}
                placeholder="Año"
                value={year}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Duración:</span>
              <input
                name="time"
                className="input-form"
                type="text"
                onChange={(e) => handleTime(e)}
                placeholder="Duración"
                value={time}
              />
            </div>
          </section>
          <div className="input-form-container-l">
            <span className="label">Reparto:</span>
            <input
              name="actors"
              className="inputs-l"
              type="text"
              onChange={(e) => handleActors(e)}
              placeholder="Reparto"
              value={actors}
            />
          </div>
          <div className="input-form-container-l">
            <span className="label">Género:</span>
            <input
              name="genre"
              className="inputs-l"
              type="text"
              onChange={(e) => handleGenre(e)}
              placeholder="Género"
              value={genre}
            />
          </div>
          <div className="input-form-container-l text-area">
            <span className="label">Sinopsis:</span>
            <textarea
              name="synopsis"
              className="inputs-l text-area"
              onChange={(e) => handleSynopsis(e)}
              placeholder="Sinopsis"
              value={synopsis}
            ></textarea>
          </div>
          <section className="container-inputs02">
            <div className="input-form-container">
              <span className="label">Rating:</span>
              <input
                name="rating"
                className="input-form"
                type="number"
                onChange={(e) => handleRating(e)}
                placeholder="Rating"
                step="any"
                value={rating}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Poster:</span>
              <input
                name="file"
                className="input-form "
                type="file"
                onChange={(e) => handleChangeFile(e)}
                placeholder="File"
                accept="image/*"
              />
            </div>

            <div className="input-form-container">
              <span className="label">Disponible:</span>
              <select
                value={available}
                className="input-form select"
                name="server"
                onChange={(e) => handleAvailable(e)}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
          </section>
          <div>
            <button type="submit" className="save-btn">
              Guardar
            </button>
            <button type="button" className="save-btn" onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </SearchSt>
  );
};

export default Search;
