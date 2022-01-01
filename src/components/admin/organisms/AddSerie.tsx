import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreInterface } from "interfaces/storeTemplate";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
    .title {
      text-align: center;
      color: white;
      font-family: "Roboto 900";
      font-size: 3rem;
      text-transform: capitalize;
      /* background: red; */
      margin-bottom: 2rem;
    }
    .upload-form {
      width: 80%;
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
        grid-template-columns: 15% 15% 25% calc(25% - 5rem) 10% 10%;
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
      // ! Estilos para la zona de rating
      .container-inputs02 {
        /* background: #bdb0b0; */
        width: 100%;
        height: 4rem;
        display: grid;
        grid-template-columns: 7.5% 22.5% calc(45% - 4rem) 15% 10%;
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
`;
const Search = () => {
  const fileRef = useRef<any>();
  let navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);
  const [language, setLanguage] = useState("latino");
  const [folder, setFolder] = useState("series-tv");
  const [file, setFile] = useState<any>();
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [rating, setRating] = useState<any>(0);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [time, setTime] = useState("");
  const [actors, setActors] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [link, setLink] = useState("");
  const [server, setServer] = useState("backblaze");
  const [available, setAvailable] = useState<any>(true);
  //   const [type, setType] = useState("");
  // const [alertImg, setAlertImg] = useState<any>(false);

  console.log(language);
//   db.movies.updateMany({}, {$set: {type: 'movie'}})
  // !Handle Change file
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files?.[0];
    // if (value && value.size > 1048576) {
    //   // setAlertImg(true);
    // } else {
    //   setFile(value);
    // }
    setFile(value);
  };
  // !Handle Change inputs
  const handleLatino = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setLanguage(value);
  };
  const handleFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setFolder(value);
  };
  // !Funtion To Capitalize first letter
  function capitalizarPrimeraLetra(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTitle(capitalizarPrimeraLetra(value));
  };
  const handleOriginalTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setOriginalTitle(capitalizarPrimeraLetra(value));
  };
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setRating(value);
  };
  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setYear(value);
  };
  const handleGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setGenre(value);
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTime(value);
  };
  const handleActors = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setActors(value);
  };
  const handleSynopsis = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value;
    setSynopsis(value);
  };
  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setLink(value);
  };
  const handleServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setServer(value);
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
    formData.append("folder", folder);
    formData.append("title", title);
    formData.append("originalTitle", originalTitle);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("genre", genre);
    formData.append("time", time);
    formData.append("actors", actors);
    formData.append("synopsis", synopsis);
    formData.append("link", link);
    formData.append("file", file);
    formData.append("server", server);
    formData.append("available", available);
    formData.append("type", "serie-tv");
    // console.log(formData)
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/movies`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          navigate(-1);
          saved();
        }
      });
  };
  // !toast
  const saved = () => toast.success("Guardado.");

  return (
    <SearchSt>
      <h2 className="title">Agregar serie</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <section className="container-inputs">
          <div className="input-form-container">
            <span className="label">Idioma:</span>
            <select
              value={language}
              className="input-form select"
              name="server"
              onChange={(e) => handleLatino(e)}
            >
              <option value="latino">Latino</option>
              <option value="subtitulado">Subtitulado</option>
            </select>
          </div>
          <div className="input-form-container">
            <span className="label">Carpeta:</span>
            <select
              value={folder}
              className="input-form select"
              name="server"
              onChange={(e) => handleFolder(e)}
            >
              <option value="series-tv">Series TV</option>
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
              ref={fileRef}
              name="file"
              className="input-form "
              type="file"
              onChange={(e) => handleChange(e)}
              placeholder="File"
              accept="image/*"
            />
          </div>
          <div className="input-form-container" style={{ opacity: 0 }}>
            <span className="label">Link de la película mp4:</span>
            <input
              name="link"
              className="input-form"
              type="text"
              onChange={(e) => handleLink(e)}
              placeholder="Link de la película."
              value={link}
              disabled
            />
          </div>
          <div className="input-form-container">
            <span className="label">Servidor:</span>
            <select
              value={server}
              className="input-form select"
              name="server"
              onChange={(e) => handleServer(e)}
            >
              <option value="backblaze">Backblaze</option>
              <option value="mediafire">Mediafire</option>
            </select>
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
    </SearchSt>
  );
};

export default Search;
