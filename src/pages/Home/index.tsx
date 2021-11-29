import React from "react";
import { Link } from "react-router-dom";
import { ImagemAluno } from "../../components/images/aluno";
import { ImagemEscola } from "../../components/images/escola";
import { ImagemTurma } from "../../components/images/turma";


// import { Container } from './styles';
// import './index.css';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="d-flex" style={{ gap: "1rem" }}>
        <Link to="/Escola/" className="card card-principal">
          <div className="card-body p-4 ">
            <img src={ImagemEscola} alt="Escola" className="imagem-card" />
          </div>
          <div className="card-footer text-center">Escolas</div>
        </Link>

        <Link to="/Aluno/" className="card card-principal">
          <div className="card-body">
            <img src={ImagemAluno} alt="Escola" className="imagem-card" />
          </div>
          <div className="card-footer text-center">Alunos</div>
        </Link>

        <Link to="/Turma/" className="card card-principal">
          <div className="card-body">
            <img src={ImagemTurma} alt="Escola" className="imagem-card" />
          </div>
          <div className="card-footer text-center">Turmas</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
