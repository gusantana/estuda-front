import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../api";

interface EscolaProps {
  id: string;
  nome: string;
}

const Aluno: React.FC = ({ props }: any) => {
  const formRef = useRef<FormHandles>(null);

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

  const submeter: SubmitHandler<any> = (data) => {
    console.log(data);
    api.post("/Aluno/salvar", data).then(retornoSubmeter);
  };

  const retornoSubmeter = (resposta: any) => {
    formRef.current?.setData(resposta.data);
  };

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
