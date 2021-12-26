import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// *Icons
import { MdLocalMovies } from "react-icons/md";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdBackup } from "react-icons/md";
import { ImExit } from "react-icons/im";
// *Redux
import { loginServer } from "redux/actions/appAction";
const NavigationSt = styled.nav`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2.5rem 2.5rem 2.5rem;
  gap: 0.2rem;
  justify-content: center;
  align-content: center;
  background: #0c0c0c;
  border-bottom: 0.0625rem solid #333333;
  padding: 0 0.5rem;
  .navLink {
    background: #222222;
    border-radius: 0.3rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    .sysIconNav {
      width: 1.5rem;
      height: 1.5rem;
    }
    .text {
    }
    .none {
      display: none;
    }
  }
  .activeNavLink {
    background: #6200ff;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: grid;
    grid-template-columns: 5rem;
    grid-auto-rows: 5rem;
    gap: 0.5rem;
    justify-content: center;
    align-content: center;
    background: #0c0c0c;
    border-right: 0.0625rem solid #333333;
    padding: 1rem 0;

    .navLink {
      width: 100%;
      height: 100%;
      background: #222222;

      border-radius: 0.3rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #a8a8a8;

      .sysIconNav {
        width: 2.5rem;
        height: 2.5rem;
      }
      .text {
        margin-top: 0.2rem;
        font-family: "Roboto 300";
        font-size: 0.6rem;
      }
      .none {
        display: flex;
      }
      :hover {
        background: #6200ffe6;
        color: white;
      }
    }
    .active {
      background: #6200ff;
      color: white;
    }
  }
`;
const Navigation = () => {
  const dispatch = useDispatch();
  //   const history = useHistory();
  // const app = useSelector((store: StoreInterface) => store.app);
  const reloadPage = (e: any) => {
    dispatch(loginServer("", "", ""));
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    // history.push(`admin/login`);
  };
  return (
    <NavigationSt>
      <NavLink className="navLink" to="/admin/">
        <MdLocalMovies className="sysIconNav" />
        <span className="text none">Media</span>
      </NavLink>
      <NavLink className="navLink" to="/admin/series">
        <BsCameraVideoFill className="sysIconNav" />
        <span className="text none">Series</span>
      </NavLink>
      <NavLink className="navLink" to="/admin/clients">
        <FaUserEdit className="sysIconNav" />
        <span className="text none">Clientes</span>
      </NavLink>

      <NavLink className="navLink" to="/admin/backup">
        <MdBackup className="sysIconNav" />
        <span className="text none">Backup</span>
      </NavLink>

      <NavLink className="navLink" to="/" onClick={reloadPage}>
        <ImExit className="sysIconNav" />
        <span className="text none">Salir</span>
      </NavLink>
    </NavigationSt>
  );
};

export default Navigation;
