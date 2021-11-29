import React from "react";

// import { Container } from './styles';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container d-flex flex-column">
      <div className=" py-4 alert">
        <h4>Escola.com</h4>
      </div>
      <div className="f-1 py-5">{children}</div>

      <div id="footer" className="py-4">
        <div className="text-center">
          <small>Escola.com - 2021 - 2021</small>
        </div>
      </div>
    </div>
  );
};

export default Layout;
