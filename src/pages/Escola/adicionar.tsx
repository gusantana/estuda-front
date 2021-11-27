import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import axios from "axios";
import React, { useRef } from "react";

import { Link } from "react-router-dom";
import Input from "../../components/Input";
import api from "../api";

interface FormData {
  id: string;
  nome: string;
  endereco: string;
}

const EscolaAdicionar: React.FC = ({ props }: any) => {
  const formRef = useRef<FormHandles>(null);

  const submeter: SubmitHandler<FormData> = (data) => {
    api.post("/Escola/salvar", data).then(retornoSubmeter);
  };

  const retornoSubmeter = (resposta: any) => {
    formRef.current?.setData(resposta.data);
  };

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
        <h6 className="card-header">Nova Escola</h6>
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

export default EscolaAdicionar;
