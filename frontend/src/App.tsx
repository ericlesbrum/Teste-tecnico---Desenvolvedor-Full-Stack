import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Menu } from './components/Menu/Menu';
import { Footer } from './components/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { PessoasPage } from './pages/PessoasPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { TransacoesPage } from './pages/TransacoesPage';
import { RelatoriosPessoasPage } from './pages/RelatoriosPessoasPage';
import { RelatoriosCategoriasPage } from './pages/RelatoriosCategoriasPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Menu />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pessoas" element={<PessoasPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
            <Route path="/relatorios/pessoas" element={<RelatoriosPessoasPage />} />
            <Route path="/relatorios/categorias" element={<RelatoriosCategoriasPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}