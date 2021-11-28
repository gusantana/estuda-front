import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
// import { Container } from './styles';
import { AxiosResponse } from "axios";
import Select from "../../components/Select";
import { Props } from "react-select/dist/declarations/src/Select";

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

  const buscaEscolas = () => {
    api.get("/Escola").then(retornoBuscaEscolas);
  };

  const retornoBuscaEscolas = (resposta: AxiosResponse<EscolaProps[]>) => {
    const opcoesEscolas = resposta.data.map((escola) => ({
      value: escola.id,
      label: escola.nome,
    }));
    setEscolas(opcoesEscolas);
  };

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
              <Select name="id_escola" id="escola" options={escolas} />
            </div>

            <div>
              <button type="submit" className="btn btn-info text-light">
                Buscar
              </button>
            </div>
          </Form>
        </div>
        <table className="table table-striped table-hover mb-0">
          <thead>
            <tr>
              <th>Série</th>
              <th>Nível</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma: TurmaProps) => (
              <tr key={turma.id}>
                <td>{turma.serie}</td>
                <td>{turma.nivel_ensino}</td>
                <td className="text-center">
                  <Link
                    to={`/Turma/editar/${turma.id}`}
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
    </>
  );
};

export default Turma;
