import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
// import { Container } from './styles';

interface EscolaProps {
  id: string;
  nome: string;
  endereco: string;
  quant_alunos: string;
}

const Escola: React.FC = () => {
  const [escolas, setEscolas] = useState<EscolaProps[]>([]);

  const inicio = () => {
    buscaEscolas();
  };

  const buscaEscolas = () => {
    api.get("/Escola/getComQuantidadeAlunos").then(retornoBuscaEscolas);
  };

  const retornoBuscaEscolas = (resposta: any) => {
    console.log(resposta.data);
    setEscolas(resposta.data);
  };

  const confirmaExclusaoEscola = (id: any) => {
    if (window.confirm("Deseja excluir a escola selecionada?")) {
      api.post("/Escola/excluir", { id: id }).then(retornoExclusaoEscola).catch(erroRetornoExclusaoEscola);
    }
  };

  const retornoExclusaoEscola = (resposta: any) => {
    inicio();
  }

  const erroRetornoExclusaoEscola = (resposta: any) => {
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
          <Link to="/Escola/adicionar" className="btn btn-primary ms-3">
            Nova Escola
          </Link>
        </div>
      </div>

      <div className="card">
        <h6 className="card-header">Escolas</h6>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Nome</th>
                <th className="text-center">Alunos Cadastrados</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {escolas.map((escola: EscolaProps) => (
                <tr key={escola.id}>
                  <td>{escola.nome}</td>
                  <td className="text-center">{escola.quant_alunos}</td>
                  <td className="text-center">
                    <Link
                      to={`/Escola/editar/${escola.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => {
                        confirmaExclusaoEscola(escola.id);
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
      </div>
    </>
  );
};

export default Escola;
