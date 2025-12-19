import { Link, useLocation } from 'react-router-dom';

export function Menu() {
    const location = useLocation();
    const items = [
        { path: '/', label: 'Dashboard' },
        { path: '/pessoas', label: 'Pessoas' },
        { path: '/categorias', label: 'Categorias' },
        { path: '/transacoes', label: 'Transações' },
    ];

    return (
        <nav>
            <ul>
                {items.map(item => (
                    <li key={item.path} style={{ fontWeight: location.pathname === item.path ? 'bold' : 'normal' }}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
