import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../api";

interface EscolaProps {
  id: string;
  nome: string;
}

const TurmaEditar: React.FC = ({ props }: any) => {
  const { id } = useParams<any>();
  const formRef = useRef<FormHandles>(null);

  const [turma, setTurma] = useState<any>([]);
  const [escolas, setEscolas] = useState<any>([]);
  const [escolaEscolhida, setEscolaEscolhida] = useState<any>({});

  const [niveisEnsino, setNiveisEnsino] = useState<any>([
    { value: "Fundamental", label: "Fundamental" },
    { value: "Médio", label: "Médio" },
  ]);

  const inicio = () => {
    buscaEscolas();
  };

  const buscaEscolas = () => {
    api.get("/Escola").then(retornoBuscaEscolas);
  };

  const retornoBuscaEscolas = (resposta: AxiosResponse<EscolaProps[]>) => {
    // const opcoesEscolas = resposta.data.map((escola) => ({
    //   value: escola.id,
    //   label: escola.nome,
    // }));

    setEscolas(resposta.data);
  };

  const buscaTurma = () => {
    api.get("/Turma", { params: { id: id } }).then(retornoBuscaTurma);
  };

  const retornoBuscaTurma = (resposta: any) => {
    setTurma(resposta.data);
    formRef.current?.setData(resposta.data);
  };

  const submeter: SubmitHandler<any> = (data) => {
    api.post("/Turma/salvar", data).then(retornoSubmeter);
  };

  const retornoSubmeter = (resposta: any) => {
    formRef.current?.setData(resposta.data);
  };

  useEffect(inicio, []);
  useEffect(buscaTurma, [escolas]);

  return (
    <>
      <div className="row mb-3">
        <div className="col-auto">
          <Link to="/Turma/" className="btn btn-outline-secondary">
            Voltar
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Nova Turma</h6>
        <div className="card-body">
          <Form ref={formRef} onSubmit={submeter}>
            <Input type="hidden" name="id" />

            <div className="mb-3">
              <label htmlFor="id_escola" className="form-label">
                Escola
              </label>
              <Select
                name="id_escola"
                id="id_escola"
                className="form-select"
              >
                {escolas.map((escola: any) => (
                  <option key={escola.id} value={escola.id}>{escola.nome}</option>
                ))}
              </Select>
            </div>

            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Série
              </label>
              <Input name="serie" id="serie" className="form-control" />
            </div>

            <div className="mb-3 col-">
              <label htmlFor="ano" className="form-label">
                Ano
              </label>
              <Input name="ano" id="ano" className="form-control" />
            </div>

            <div className="mb-3 col-auto">
              <label htmlFor="nivel_ensino" className="form-label">
                Nível de Ensino
              </label>
              <Select
                name="nivel_ensino"
                id="nivel_ensino"
                className="form-select"
              >
                {niveisEnsino.map((nivel: any) => (
                  <option key={nivel.value} value={nivel.value}>
                    {nivel.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mb-3">
              <label htmlFor="turno" className="form-label">
                Turno
              </label>
              <Input name="turno" id="turno" className="form-control" />
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

export default TurmaEditar;
