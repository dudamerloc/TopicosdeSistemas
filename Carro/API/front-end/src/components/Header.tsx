// src/components/Header.tsx
import './style.css'; // Corrigido: certifique-se de que o caminho do arquivo está correto.

function Header() {
  return (
    <nav className="navbar">
      <div className="logo">Carros</div>
      <ul className="nav-links">
        <li className="nav-link">Início</li>
        <li className="nav-link">Sobre</li>
        <li className="nav-link">Contato</li>
      </ul>
    </nav>
  );
}

export default Header;
