import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Error404 from "../Error404";
import Navigation from "components/admin/organisms/Navigation";
import Media from "components/admin/pages/Media";
import Clients from "components/admin/pages/Clients";
import Backup from "components/admin/pages/Backup";

import AddMedia from "components/admin/organisms/AddMedia";
import UpdateMedia from "components/admin/organisms/UpdateMedia";
import AddClient from "components/admin/organisms/AddClient";
import UpdateClient from "components/admin/organisms/UpdateClient";

const AdminSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 100%;
  }
`;

const Admin = () => {
  //   const app = useSelector((store: StoreInterface) => store.app);
  return (
    <AdminSt>
      <Navigation />
      <Routes>
        <Route path="/" element={<Media />} />
        <Route path="/add-media" element={<AddMedia />} />
        <Route path="/update-media/:id" element={<UpdateMedia />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/create-user" element={<AddClient />} />
        <Route path="/update-user/:id" element={<UpdateClient />} />
        <Route path="/backup" element={<Backup />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </AdminSt>
  );
};

export default Admin;
