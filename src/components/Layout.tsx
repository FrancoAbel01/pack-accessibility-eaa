import { Outlet } from 'react-router-dom';
import {Header} from './Header';
import Footer from './Footer';
import SkipLink from './SkipLink';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Esto renderizará las páginas hijas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;