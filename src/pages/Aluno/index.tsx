import { FormHandles } from "@unform/core";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import api from "../api";

const Aluno: React.FC = ({ props }: any) => {
  const [alunos, setAlunos] = useState<any>([]);

  const inicio = () => {
    buscaAlunos();
  };

  const buscaAlunos = () => {
    api.get("/Aluno").then(retornoBuscaAlunos);
  };

  const retornoBuscaAlunos = (resposta: AxiosResponse<any[]>) => {
    setAlunos(resposta.data);
  };

  const confirmaExclusaoAluno = (id: any) => {
    if (window.confirm("Deseja excluir o aluno selecionado?")) {
      api.post("/Aluno/excluir", {id: id}).then(retornoExclusao).catch(erroRetornoExclusao);
    }
  }

  const retornoExclusao = (resposta: any) => {
    inicio();
  }

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
          <Link to="/Aluno/adicionar/" className="btn btn-primary ms-3">
            Adicionar
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Alunos</h6>
        <table className="table table-striped table-hover mb-0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno: any) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td className="text-center">
                  <Link
                    to={`/Aluno/editar/${aluno.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => {
                      confirmaExclusaoAluno(aluno.id);
                    }}
                  >
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

export default Aluno;
