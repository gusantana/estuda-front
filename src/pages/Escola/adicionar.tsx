import React from 'react';

import { Link } from 'react-router-dom';

const EscolaAdicionar: React.FC = () => {
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
            
        </div>
      </div>
    </>
  );
}

export default EscolaAdicionar;