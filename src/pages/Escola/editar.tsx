import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef } from "react";

import { Link, useParams } from "react-router-dom";
import Input from "../../components/Input";
import api from "../api";

interface FormData {
  id: string;
  nome: string;
  endereco: string;
}

const EscolaEditar: React.FC = ({ props }: any) => {
    const { id } = useParams<any>();
  const formRef = useRef<FormHandles>(null);

  const submeter: SubmitHandler<FormData> = (data) => {
    api.post("/Escola/salvar", data).then(retornoSubmeter);
  };

  const retornoSubmeter = (resposta: any) => {
    formRef.current?.setData(resposta.data);
  };

  const inicio = () => {
      obtemDadosEscola();
  }

  const obtemDadosEscola = () => {
      api.get("/Escola/get", { params: { id } })
        .then(retornoObtemDadosEscola);
  }

  const retornoObtemDadosEscola = (resposta: AxiosResponse<any>) => {
    console.log(resposta.data);
    formRef.current?.setData(resposta.data);
  }

  useEffect(inicio, []);

  return (
    <>
      <div className="row mb-3">
        <div className="col-auto">
          <Link to="/Escola/" className="btn btn-outline-secondary">
            Voltar
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Editar Escola</h6>
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
              <label htmlFor="endereco" className="form-label">
                Endereço
              </label>
              <Input name="endereco" id="endereco" className="form-control" />
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

export default EscolaEditar;
