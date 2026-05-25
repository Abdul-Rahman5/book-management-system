
import { Outlet } from 'react-router-dom';
import Navabr from './../Navabr/Navabr';
import Footer from './../Footer/Footer';
export default function Layout() {
  return <>
    <Navabr />
    <div className="containtger py-5">
      <Outlet> </Outlet>
    </div> 
   <Footer />

  </>
}
