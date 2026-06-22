import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Campeonatos from './pages/Campeonatos';
import Torneio from './pages/Torneio';
import Campeoes from './pages/Campeoes';
import Resultados from './pages/Resultados';
import Regras from './pages/Regras';
import Sobre from './pages/Sobre';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="campeonatos" element={<Campeonatos />} />
        <Route path="torneio/:id" element={<Torneio />} />
        <Route path="campeoes" element={<Campeoes />} />
        <Route path="resultados" element={<Resultados />} />
        <Route path="regras" element={<Regras />} />
        <Route path="sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
}
