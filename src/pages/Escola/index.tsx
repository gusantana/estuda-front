import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api";
// import { Container } from './styles';

const Escola: React.FC = () => {
  const [escolas, setEscolas] = useState<any>({});

  const buscaEscolas = () => {
    api.get("/Escola/?id=1").then(retornoBuscaEscolas);
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
          <Link to="/Escola/adicionar" className="btn btn-primary">
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
              {/* {escolas.map((escola: any) => (
                <tr></tr>
              ))} */}
              <tr>
                <td>{escolas.nome}</td>
                <td className="text-center">
                  <Link to={"#"} className="btn btn-secondary btn-sm">
                    {escolas.nome}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Escola;
