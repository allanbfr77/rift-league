import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Background from './Background';
import Nav from './Nav';
import Ticker from './Ticker';
import Footer from './Footer';
import BackToTop from './BackToTop';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Background />
      <Nav />
      <Ticker />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
