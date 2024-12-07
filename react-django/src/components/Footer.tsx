import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MegaCompany. Todos los derechos reservados.</p>
      <p>Desarrollado con ❤️ usando React y Django.</p>
    </footer>
  );
};

export default Footer;
