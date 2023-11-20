import {ReactNode} from 'react';
import './layout.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface props{
  children?: ReactNode;
}

const Layout = ({children, ...props}:props) =>  {
  
  return (
    <div className="container">
      <div className='myApp'>
        <Header />
        <main className='mt-5 mains'{...props}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
