import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
// import { Container } from './styles';

interface Escola {
  id: string,
  nome: string,
  endereco: string
}

const Escola: React.FC = () => {
  const [escolas, setEscolas] = useState<Escola[]>([]);

  const buscaEscolas = () => {
    api.get("/Escola/").then(retornoBuscaEscolas);
  };

  const retornoBuscaEscolas = (resposta: any) => {
    // console.log(resposta.data);
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
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {escolas.map((escola: Escola) => (
                <tr key={escola.id}>
                  <td>{escola.nome}</td>
                  <td className="text-center">
                    <Link
                      to={`/Escola/editar/${escola.id}`}
                      className="btn btn-secondary btn-sm"
                    >Editar</Link>
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
