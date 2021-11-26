import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../components/_layout";
import Home from "../pages/Home";
import Turma from "../pages/Turma";
import Aluno from "./../pages/Aluno/index";
import Escola from "./../pages/Escola/index";
import EscolaAdicionar from './../pages/Escola/adicionar';

const Rotas: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/Escola/adicionar">
          <EscolaAdicionar />
        </Route>
        <Route path="/Escola">
          <Escola />
        </Route>
        <Route path="/Aluno">
          <Aluno />
        </Route>
        <Route path="/Turma">
          <Turma />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Rotas;
