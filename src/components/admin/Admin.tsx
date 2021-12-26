import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Error404 from "../Error404";
import Navigation from "components/admin/organisms/Navigation";
import Media from "components/admin/pages/Media";
import Series from "components/admin/pages/Series";
import Episodes from "components/admin/pages/Episodes";
import Clients from "components/admin/pages/Clients";
import Backup from "components/admin/pages/Backup";

import AddMedia from "components/admin/organisms/AddMedia";
import AddSeries from "components/admin/organisms/AddSeries";
import AddEpisode from "components/admin/organisms/AddEpisode";
import UpdateMedia from "components/admin/organisms/UpdateMedia";
import UpdateSeries from "components/admin/organisms/UpdateSeries";
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
        <Route path="/series" element={<Series />} />
        <Route path="/add-series" element={<AddSeries />} />
        <Route path="/update-series/:id" element={<UpdateSeries />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/add-episode" element={<AddEpisode />} />
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
