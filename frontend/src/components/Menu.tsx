import { Link, useLocation } from 'react-router-dom';

export function Menu() {
    const location = useLocation();

    const items = [
        { path: '/', label: 'Dashboard' },
        { path: '/pessoas', label: 'Pessoas' },
        { path: '/categorias', label: 'Categorias' },
        { path: '/transacoes', label: 'Transações' },
    ];

    const relatorioItems = [
        { path: '/relatorios/pessoas', label: 'Relatório por Pessoa' },
        { path: '/relatorios/categorias', label: 'Relatório por Categoria' },
    ];

    const isActive = (path: string) => location.pathname === path;
    const isRelatorioActive = relatorioItems.some(item => item.path === location.pathname);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Controle de Gastos</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {items.map(item => (
                            <li key={item.path} className="nav-item">
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${isRelatorioActive ? 'active' : ''}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Relatórios
                            </a>
                            <ul className="dropdown-menu">
                                {relatorioItems.map(item => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`dropdown-item ${isActive(item.path) ? 'active' : ''}`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}