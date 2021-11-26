import React from "react";

// import { Container } from './styles';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container">
      <div>cabeçalho</div>
      {children}
      <div id="footer">
          footer
      </div>
    </div>
  );
};

export default Layout;
