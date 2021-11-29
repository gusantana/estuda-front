import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../api";

interface EscolaProps {
  id: string;
  nome: string;
}

const TurmaAdicionar: React.FC = ({ props }: any) => {
  const formRef = useRef<FormHandles>(null);
  let history = useHistory();
  const [escolas, setEscolas] = useState<any>([]);
  const [niveisEnsino, setNiveisEnsino] = useState<any>([
    { value: "Fundamental", label: "Fundamental" },
    { value: "Médio", label: "Médio" },
  ]);

  const submeter: SubmitHandler<any> = (data) => {
    console.log(data);
    api.post("/Turma/salvar", data).then(retornoSubmeter);
  };

  const retornoSubmeter = (resposta: any) => {
    console.log(resposta.data);
    formRef.current?.setData(resposta.data);
    alert("Turma Adicionada com sucesso!");
    history.goBack();
  };

  const buscaEscolas = () => {
    api.get("/Escola").then(retornoBuscaEscolas);
  };

  const retornoBuscaEscolas = (resposta: AxiosResponse<EscolaProps[]>) => {
    const opcoesEscolas = resposta.data.map((escola) => ({
      value: escola.id,
      label: escola.nome,
    }));
    setEscolas(resposta.data);
  };

  const inicio = () => {
    buscaEscolas();
  };

  useEffect(inicio, []);

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
        <Form ref={formRef} onSubmit={submeter}>
          <div className="card-body ">
            <Input type="hidden" value="" name="id" />

            <div className="mb-3">
              <label htmlFor="id_escola" className="form-label">
                Escola
              </label>
              <Select className="form-select" name="id_escola" id="id_escola">
                {escolas.map((escola: any) => (
                  <option value={escola.id}>{escola.nome}</option>
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
              <Input
                type="number"
                inputMode="numeric"
                max="2022"
                max-length="4"
                name="ano"
                id="ano"
                className="form-control"
              />
            </div>

            <div className="mb-3 col-auto">
              <label htmlFor="nivel_ensino" className="form-label">
                Nível de Ensino
              </label>
              <Select
                className="form-select"
                name="nivel_ensino"
                id="nivel_ensino"
              >
                {niveisEnsino.map((nivel: any) => (
                  <option value={nivel.value}>{nivel.label}</option>
                ))}
              </Select>
            </div>

            <div className="mb-3">
              <label htmlFor="turno" className="form-label">
                Turno
              </label>
              <Select 
              name="turno" 
              id="turno" 
              className="form-select">
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
              </Select>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end ">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default TurmaAdicionar;
