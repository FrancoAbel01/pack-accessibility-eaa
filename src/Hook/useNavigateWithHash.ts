import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateWithHash = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const scrollToElement = (hash: string, attempts = 0) => {
    const element = document.getElementById(hash);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }

    if (attempts < 5) { // 5 intentos con timeout creciente
      setTimeout(() => scrollToElement(hash, attempts + 1), 100 * (attempts + 1));
    }
    
    return false;
  };

  const goToHash = (hash: string) => {
    if (pathname !== '/') {
      navigate(`/#${hash}`, { replace: true });
      setTimeout(() => scrollToElement(hash), 300); // Tiempo extra para navegación
    } else {
      if (!scrollToElement(hash)) {
        navigate(`/#${hash}`, { replace: true }); // Forzar actualización de hash
        setTimeout(() => scrollToElement(hash), 100);
      }
    }
  };

  return goToHash;
};