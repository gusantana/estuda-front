import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../components/_layout";
import Home from "../pages/Home";
import Turma from "../pages/Turma";
import TurmaAdicionar from "../pages/Turma/adicionar";
import Aluno from "./../pages/Aluno/index";
import Escola from "./../pages/Escola/index";
import EscolaAdicionar from './../pages/Escola/adicionar';
import EscolaEditar from "../pages/Escola/editar";
import TurmaEditar from './../pages/Turma/editar';
import AlunoEditar from "../pages/Aluno/editar";
import AlunoAdicionar from "../pages/Aluno/adicionar";

const Rotas: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/Escola/editar/:id">
          <EscolaEditar />
        </Route>
        <Route path="/Escola/adicionar">
          <EscolaAdicionar />
        </Route>
        <Route path="/Escola">
          <Escola />
        </Route>
        <Route path="/Aluno/editar/:id">
          <AlunoEditar />
        </Route>
        <Route path="/Aluno/adicionar">
          <AlunoAdicionar />
        </Route>
        <Route path="/Aluno">
          <Aluno />
        </Route>
        <Route path="/Turma/editar/:id">
          <TurmaEditar />
        </Route>
        <Route path="/Turma/adicionar">
          <TurmaAdicionar />
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
