
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/react_logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log('Current Path:', currentPath);

  return (
    <nav className="z-50 bg-[#EDEAE4] fixed top-0 left-0 w-full costum-bg flex justify-center h-24">
      <div className="flex flex-1 items-center max-w-[1440px] md:px-[64px] w-full">
        <div className="hidden md:flex">
          <Link to="/">
            <img src={logo} alt="logo" width="60" height="60" />
          </Link>
        </div>
        <div className="mx-auto">
          <ul className="flex flex-1 space-x-3">
            <li>
              <Link
                to="/"
                className={`tracking-[2px] font-bold text-sm font-itcfranklinbold uppercase relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black ${
                  currentPath === '/' ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                } after:transition-all`}
              >
                our work
              </Link>
            </li>
            <div className="font-sans">|</div>
            <li>
              <Link
                to="/about-us"
                className={`tracking-[2px] font-bold text-sm font-itcfranklinbold uppercase relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black ${
                  currentPath === '/about-us' ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                } after:transition-all`}
              >
                about us
              </Link>
            </li>
            <div className="font-sans">|</div>
            <li>
              <Link
                to="/get-involved"
                className={`tracking-[2px] font-bold text-sm font-itcfranklinbold uppercase relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black ${
                  currentPath === '/get-involved' ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                } after:transition-all`}
              >
                get involved
              </Link>
            </li>
            <div className="font-sans">|</div>
            <li>
              <Link
                to="/join-us"
                className={`tracking-[2px] font-bold text-sm font-itcfranklinbold uppercase relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black ${
                  currentPath === '/join-us' ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                } after:transition-all`}
              >
                join us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

