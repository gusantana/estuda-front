import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../api";

const AlunosDaTurma: React.FC = ({ props }: any) => {
  const { id_turma } = useParams<any>();
  const formRef = useRef<FormHandles>(null);
  const opcaoVazia = { id: 0, nome: "Selecione um aluno"};

  const [turma, setTurma] = useState<any>([]);
  const [alunosNaoCadastrados, setAlunosNaoCadastrados] = useState<any>([]);
  const [alunosCadastrados, setAlunosCadastrados] = useState<any>([]);

  const inicio = () => {
    buscaTurma();
    
  };

  const buscaTurma = () => {
    api
      .get("/Turma/get/", { params: { id: id_turma } })
      .then(retornoBuscaTurma);
  };

  const retornoBuscaTurma = (resposta: AxiosResponse<any[]>) => {
    setTurma(resposta.data);
  };

  const buscaAlunosDaTurma = () => {
    if (turma.id) {
      api
        .get("AlunoTurma/getAlunosDaTurma", { params: { id_turma: turma.id } })
        .then(retornoBuscaAlunosDaTurma);

    }
  };

  const retornoBuscaAlunosDaTurma = (resposta: AxiosResponse<any>) => {
    setAlunosCadastrados(resposta.data);
    buscaAlunosNaoCadastrados();
  };

  const buscaAlunosNaoCadastrados = () => {
    if (turma.id) {
      api
        .get("/AlunoTurma/getAlunosNaoCadastradosNaTurma", {
          params: { id_turma: turma.id },
        })
        .then(retornoBuscaAlunosNaoCadastrados);
    }
  };

  const retornoBuscaAlunosNaoCadastrados = (resposta: any) => {
    if (resposta.data.length > 0) {
      setAlunosNaoCadastrados([opcaoVazia, ...resposta.data]);
    }
    else {
      setAlunosNaoCadastrados([opcaoVazia]);
    }
  };

  const submeter: SubmitHandler<any> = (data) => {
    api.post("/AlunoTurma/salvar", data).then(retornoSubmeter).catch(retornoErroSubmeter);
  };

  const retornoSubmeter = (resposta: any) => {
    alert("Aluno inserido na turma");
    formRef.current?.setData(resposta.data);
    inicio();
  };

  const retornoErroSubmeter = (resposta: any) => {
    alert(resposta.response.data);
  }

  const confirmaRemocao = (id_aluno: any) => {
    if (window.confirm("Deseja remover o aluno desta turma?")) {
      api.post("/AlunoTurma/excluir", {id: id_aluno}).then(inicio);
    }
  }

  useEffect(inicio, []);
  useEffect(buscaAlunosDaTurma, [turma]);

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
        <h6 className="card-header">Alunos da Turma</h6>
        <div className="card-body">
          <Form ref={formRef} onSubmit={submeter}>
            <Input type="hidden" value={id_turma} name="id_turma" />
            <div className="mb-3">
              <p>
                <span className="me-4">Série: {turma.serie}</span>
                <span className="me-4">
                  Nível de Ensino: {turma.nivel_ensino}
                </span>
                <span className="me-4">
                  Turno: {!!turma.turno ? turma.turno : "Não cadastrado"}
                </span>
              </p>
            </div>

            <div className="row">
              <div className="col-auto">
                <Select name="id_aluno" className="form-select">
                  {alunosNaoCadastrados.map((aluno: any) => (
                    <option key={aluno.id} value={aluno.id}>
                      {aluno.nome}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                  Adicionar
                </button>
              </div>
            </div>
          </Form>
        </div>
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosCadastrados.map((aluno: any) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-danger" onClick={() => {confirmaRemocao(aluno.id)}}>
                    Remover
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

export default AlunosDaTurma;
