import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
        grid-template-columns: 15% calc(45% - 2rem) 40%;
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
          border: 0.0625rem solid #7801e7;
          border-radius: 0 0.3rem 0.3rem 0.3rem;
          .label {
            background: #7801e7;
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
        border: 0.0625rem solid #7801e7;
        margin-bottom: 2rem;
        .label {
          background: #7801e7;
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
        grid-template-columns: calc(40% - 2rem) 50% 10%;
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
          border: 0.0625rem solid #7801e7;
          border-radius: 0 0.3rem 0.3rem 0.3rem;
          .label {
            background: #7801e7;
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
        background: #7801e7;
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
  let location = useLocation();
  const params = useParams();
  let navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);
  // !States
  const [serieID, setSerieID] = useState("");
//   const [id, setID] = useState("");
  const [language, setLanguage] = useState("latino");
  const [season, setSeason] = useState<any>(0);
  const [episode, setEpisode] = useState<any>(0);
  const [file, setFile] = useState<any>();
  const [link, setLink] = useState("");
  const [available, setAvailable] = useState<any>(true);
  //! States images
  const [imageXL, setImageXL] = useState("");
  const [imageL, setImageL] = useState("");
  const [imageM, setImageM] = useState("");
  const [imageS, setImageS] = useState("");

  // !Handle Change inputs
  const handleLatino = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setLanguage(value);
  };
  const handleSeason = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setSeason(value);
  };
  const handleEpisode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setEpisode(value);
  };
  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setLink(value);
  };
  const handleAvailable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value === "true" ? true : false;
    setAvailable(value);
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files?.[0];
    setFile(value);
  };
  // !Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("serieID", serieID);
    formData.append("language", language);
    formData.append("season", season);
    formData.append("episode", episode);
    formData.append("file", file);
    formData.append("link", link);
    formData.append("available", available);
    formData.append("imageXL", imageL);
    formData.append("imageL", imageL);
    formData.append("imageM", imageM);
    formData.append("imageS", imageS);
    await axios
      //       .put(`${process.env.REACT_APP_BACKEND_URL}/series/${params.id}`, formData, {
      .put(`${process.env.REACT_APP_BACKEND_URL}/episodes/${params.id}`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          navigate(-1);
          saved();
        }
      });
  };
  // !toast
  const saved = () => toast.success("Guardado.");
  // !First fetch
  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/episodes/${params.id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        let data = response.data;
        setSerieID(data.serieID);
        // setID(data._id);
        setLanguage(data.language);
        setSeason(data.season);
        setEpisode(data.episode);
        setLink(data.link);
        setImageL(data.imageXL);
        setImageL(data.imageL);
        setImageM(data.imageM);
        setImageS(data.imageS);
        setAvailable(data.available);
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
  return (
    <SearchSt>
      <h2 className="title">Actualizar Episodio</h2>

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
            <span className="label">Temporada:</span>
            <input
              name="season"
              className="input-form"
              type="number"
              onChange={(e) => handleSeason(e)}
              placeholder="Temporada"
              value={season}
            />
          </div>
          <div className="input-form-container">
            <span className="label">Episodio:</span>
            <input
              name="episode"
              className="input-form"
              type="text"
              onChange={(e) => handleEpisode(e)}
              placeholder="Episodio"
              value={episode}
            />
          </div>
        </section>

        <section className="container-inputs02">
          <div className="input-form-container">
            <span className="label">Poster:</span>
            <input
              name="file"
              className="input-form "
              type="file"
              onChange={(e) => handleFile(e)}
              placeholder="File"
              accept="image/*"
            />
          </div>
          <div className="input-form-container">
            <span className="label">Link del episodio mp4:</span>
            <input
              name="link"
              className="input-form"
              type="text"
              onChange={(e) => handleLink(e)}
              placeholder="Link del episodio."
              value={link}
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
    </SearchSt>
  );
};

export default Search;
