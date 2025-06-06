import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll al inicio en cada cambio de ruta
  }, [pathname]);

  return null; // Este componente no renderiza nada
};