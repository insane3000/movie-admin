import styled from "styled-components";
const SpinnerSt = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 4rem;
    height: 4rem;
    background-color: #6200ff;

    margin: 6.25rem auto;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }

  @-webkit-keyframes sk-rotateplane {
    0% {
      -webkit-transform: perspective(7.5rem);
    }
    50% {
      -webkit-transform: perspective(7.5rem) rotateY(180deg);
    }
    100% {
      -webkit-transform: perspective(7.5rem) rotateY(180deg) rotateX(180deg);
    }
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(7.5rem) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(7.5rem) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(7.5rem) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(7.5rem) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(7.5rem) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(7.5rem) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
  // !Estilos para DESKTOP
  @media only screen and (min-width: 568px) {
  }
`;
const Spinner = () => {
  return (
    <SpinnerSt>
      <div className="spinner"></div>
    </SpinnerSt>
  );
};

export default Spinner;
