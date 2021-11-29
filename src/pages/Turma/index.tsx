import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
import { AxiosResponse } from "axios";
import Select from "../../components/Select";

interface TurmaProps {
  id: string;
  id_escola: string;
  nivel_ensino: string;
  serie: string;
  turno: string;
  ano: string;
}

interface EscolaProps {
  id: string;
  nome: string;
}

const Turma: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [turmas, setTurmas] = useState<TurmaProps[]>([]);
  const [escolas, setEscolas] = useState<any>([]);

  const inicio = () => {
    buscaEscolas();
  };

  const buscaEscolas = () => {
    api.get("/Escola").then(retornoBuscaEscolas);
  };

  const retornoBuscaEscolas = (resposta: AxiosResponse<EscolaProps[]>) => {
    setEscolas(resposta.data);
    formRef.current?.submitForm();
  };

  const buscaTumasDeEscola: SubmitHandler<any> = (data) => {
    // console.log(data);
    api
      .get("/Turma/getPorEscola/", { params: data })
      .then(retornoBuscaTumasDeEscola);
  };

  const retornoBuscaTumasDeEscola = (resposta: AxiosResponse<any>) => {
    // console.log(retorno);
    setTurmas(resposta.data);
  };

  const confirmaExclusaoTurma = (id: any) => {
    if (window.confirm("Deseja excluir a turma selecionada?")) {
      api
        .post("/Turma/excluir", { id: id })
        .then(retornoExclusao)
        .catch(erroRetornoExclusao);
    }
  }

  const retornoExclusao = (resposta: any) => {
    inicio();
  };

  const erroRetornoExclusao = (resposta: any) => {
    console.log(resposta);
  }

  useEffect(inicio, []);

  return (
    <>
      <div className="row mb-3">
        <div className="col-auto">
          <Link to="/Home/" className="btn btn-outline-secondary">
            Voltar
          </Link>
          <Link to="/Turma/adicionar" className="btn btn-primary ms-3">
            Nova Turma
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Turmas</h6>
        <div className="card-body">
          <Form ref={formRef} onSubmit={buscaTumasDeEscola}>
            <div className="mb-3">
              <label htmlFor="escola" className="form-label">
                Escola
              </label>
              <Select
                name="id_escola"
                id="id_escola"
                className="form-select"
                onChange={() => {
                  formRef.current?.submitForm();
                }}
              >
                {escolas.map((escola: any) => (
                  <option key={escola.id} value={escola.id}>
                    {escola.nome}
                  </option>
                ))}
              </Select>
            </div>
          </Form>
        </div>
        <table className="table table-striped table-hover mb-0 ">
          <thead>
            <tr>
              <th>Série</th>
              <th>Nível</th>
              <th className="text-center" style={{ maxWidth: "10%" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma: TurmaProps) => (
              <tr key={turma.id}>
                <td className=" ml-3">{turma.serie}</td>
                <td>{turma.nivel_ensino}</td>
                <td className=" text-center">
                  <Link
                    to={`/Turma/editar/${turma.id}`}
                    className="btn btn-secondary btn-sm me-3"
                  >
                    Editar
                  </Link>
                  <Link
                    to={`/Turma/verAlunos/${turma.id}`}
                    className="btn btn-info text-light btn-sm me-3"
                  >
                    Ver Alunos
                  </Link>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => {confirmaExclusaoTurma(turma.id)}}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Turma;
