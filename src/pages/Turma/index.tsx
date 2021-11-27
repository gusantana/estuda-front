import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
// import { Container } from './styles';
import { AxiosResponse } from 'axios';
import Select from "../../components/Select";

interface TurmaProps {
  id: string;
  nome: string;
  endereco: string;
}

interface EscolaProps {
  id: string;
  nome: string;
}

const Turma: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  
  const [turmas, setTurmas] = useState<TurmaProps[]>([]);
  const [escolas, setEscolas] = useState<EscolaProps[]>([]);

  const buscaTumasDeEscola: SubmitHandler<any> = (data) => {
    // api.get("/Turma/getPorEscola/").then(retornoBuscaEscolas);
    console.log(data);
  };

  const buscaEscolas = () => {
    api.get('/Escola').then(retornoBuscaEscolas);
  }

  const retornoBuscaEscolas = (resposta: AxiosResponse<any>) => {
    setEscolas(resposta.data);
  }

  const inicio = () => {
    buscaEscolas();
  };

  useEffect(inicio, []);

  return (
    <>
      <div className="row mb-3">
        <div className="col-auto">
          <Link to="/Home/" className="btn btn-outline-secondary">
            Voltar
          </Link>
          <Link to="/Escola/adicionar" className="btn btn-primary ms-3">
            Nova Escola
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Turmas</h6>
        <div className="card-body">
          <Form ref={formRef} onSubmit={buscaTumasDeEscola} >
            <div className="mb-3">
              <label htmlFor="escola" className="form-label">Escola</label>
              <Select name="id_escola" id="escola" className="form-select">
                <option value="">Selecione uma escola</option>
                {escolas.map(escola => (
                  <option value={escola.id} key={escola.id}>{escola.nome}</option>
                ))}
              </Select>
            </div>

            <div>
              <button type="submit" className="btn btn-info text-light">Buscar</button>
            </div>
          </Form>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Nome</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma: TurmaProps) => (
                <tr key={turma.id}>
                  <td>{turma.nome}</td>
                  <td className="text-center">
                    <Link
                      to={`/Escola/editar/${turma.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Turma;
