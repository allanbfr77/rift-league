import { Outlet } from 'react-router-dom';
import Background from './Background';
import Nav from './Nav';
import Ticker from './Ticker';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Background />
      <Nav />
      <Ticker />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
