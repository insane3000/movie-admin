import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Error404 from "../Error404";
import Navigation from "components/admin/organisms/Navigation";
import Media from "components/admin/pages/Media";
// import Series from "components/admin/pages/Series";
import Episodes from "components/admin/pages/Episodes";
import Clients from "components/admin/pages/Clients";
import Backup from "components/admin/pages/Backup";

import AddMedia from "components/admin/organisms/AddMedia";
// import AddSerie from "components/admin/organisms/AddSerie";
import AddEpisode from "components/admin/organisms/AddEpisode";
import UpdateMedia from "components/admin/organisms/UpdateMedia";
// import UpdateSerie from "components/admin/organisms/UpdateSerie";
import UpdateEpisode from "components/admin/organisms/UpdateEpisode";

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

        {/* <Route path="/series" element={<Series />} />
        <Route path="/add-serie" element={<AddSerie />} />
        <Route path="/update-serie/:id" element={<UpdateSerie />} /> */}

        <Route path="/serie-episodes/:id" element={<Episodes />} />
        <Route path="/add-episode/:id" element={<AddEpisode />} />
        <Route path="/update-episode/:id" element={<UpdateEpisode />} />

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
