import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Layout from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

import { PackAccessibility } from './pages/PackAccessibility';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* 👈 Correcto: fuera de <Routes> */}
      <Routes>
        {/* Ruta principal con Layout */}
        <Route path="/" element={<Layout />}>
          {/* Página de inicio */}
          <Route index element={<PackAccessibility />} />
          
          {/* Página AlliBot */}
    
          <Route path="/pack-accessibility-eaa" element={<PackAccessibility/>} />
          
          {/* Otras rutas que necesites */}
          {/* <Route path="services" element={<div>Services Page</div>} />
          <Route path="contact" element={<div>Contact Page</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;