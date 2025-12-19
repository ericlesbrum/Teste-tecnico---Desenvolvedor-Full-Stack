import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { DashboardPage } from './pages/DashboardPage';
import { PessoasPage } from './pages/PessoasPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { TransacoesPage } from './pages/TransacoesPage';

export function App() {
  return (
    <Router>
      <div>
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pessoas" element={<PessoasPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
