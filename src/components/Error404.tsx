import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ErrorSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  h1 {
    font-family: "Roboto 900", sans-serif;
    font-weight: 900;
    font-size: 4rem;
    text-align: center;
  }
  h2 {
    font-family: "Roboto 500", sans-serif;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
  }
  span {
    font-family: "Roboto 100", sans-serif;
    font-weight: 900;
    font-size: 1rem;
    margin-top: 0.5rem;
    color: white;
    text-align: center;
  }
  .btn-home {
    width: auto;
    height: 3rem;
    line-height: 3rem;
    font-family: "Roboto 900";
    font-size: 1.5rem;
    color: white;
    padding: 0 1rem;
    margin-top: 2rem;
    border-style: none;
    outline: none;
    border-radius: 0.3rem;
    background: #5100ff;
    cursor: pointer;
    text-decoration: none;
  }
  // !Estilos para DESKTOP
  @media only screen and (min-width: 568px) {
    h1 {
      font-size: 6rem;
    }
    h2 {
      font-size: 3rem;
    }
    span {
      font-size: 1.5rem;
    }
    .btn-home {
      width: auto;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 900";
      font-size: 1.5rem;
      color: white;
      padding: 0 1rem;
      margin-top: 2rem;
      border-style: none;
      outline: none;
      border-radius: 0.3rem;
      background: #5100ff;
      cursor: pointer;
      text-decoration: none;
    }
  }
`;
const Error404 = () => {
  return (
    <ErrorSt>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <span>La pagina que quieres buscar, no esta disponible.</span>
      <Link className="btn-home" type="button" to="/">
        Ir a inicio
      </Link>
    </ErrorSt>
  );
};

export default Error404;
