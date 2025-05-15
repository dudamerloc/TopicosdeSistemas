import './styles.css';

function Header() {

    return (
        <header>
            <nav className="navbar">
                <div className="logo">Produtos</div>
                    <ul className="nav-links">
                        <li><a href="#">Listar</a></li>
                        <li><a href="#">Cadastrar</a></li>
                        <li><a href="#">Categorias </a></li>
                    </ul>
                </nav>
        </header>
    )
}

export default Header;