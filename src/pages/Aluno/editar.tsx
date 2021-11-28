import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../api";

const AlunoEditar: React.FC = ({ props }: any) => {
  const { id } = useParams<any>();
  const formRef = useRef<FormHandles>(null);

  const [alunos, setAlunos] = useState<any>([]);

  const inicio = () => {
    buscaAlunos();
  };

  const buscaAlunos = () => {
    api.get("/Aluno/get/", { params: { id } }).then(retornoBuscaAlunos);
  };

  const retornoBuscaAlunos = (resposta: AxiosResponse<any[]>) => {
    formRef.current?.setData(resposta.data);
  };

  const submeter: SubmitHandler<any> = (data) => {
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
          <Link to="/Aluno/" className="btn btn-outline-secondary">
            Voltar
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Editar Aluno</h6>
        <div className="card-body">
          <Form ref={formRef} onSubmit={submeter}>
            <Input type="hidden" value="" name="id" />

            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <Input name="nome" id="nome" className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <Input name="email" id="email" className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="data_nascimento" className="form-label">
                Data de nascimento
              </label>
              <Input
                name="data_nascimento"
                id="data_nascimento"
                className="form-control"
                type="date"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="genero" className="form-label">
                Gênero
              </label>
              <Input
                name="genero"
                id="genero"
                className="form-control"
                type="text"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AlunoEditar;
