import React from "react";
import { Link } from "react-router-dom";

// import { Container } from './styles';
// import './index.css';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="d-flex" style={{gap: '1rem'}}>
        <Link to="/Escola/" className="card">
          <div className="card-body">Escolas</div>
          <div className="card-footer">Escolas</div>
        </Link>

        <Link to="/Aluno/" className="card">
          <div className="card-body">Alunos</div>
          <div className="card-footer">Alunos</div>
        </Link>

        <Link to="/Turma/" className="card">
          <div className="card-body">Turmas</div>
          <div className="card-footer">Turmas</div>
        </Link>

      </div>
    </div>
  );
};

export default Home;
