import React, { useState, useCallback, useEffect } from 'react';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showaccountMenu, setShowaccountMenu] = useState(false);
  const [showBackground, setshowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setshowBackground(true);
      } else {
        setshowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((curr) => !curr);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowaccountMenu((curr) => !curr);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`
    px-4
    md:px-16
    mt-6
    flex
    flex-row
    items-center
    transition
    duration-500
   ${showBackground ? 'bg-zinc-900/90' : ''}

    `}
      >
        <img className='h-4 lg:h-7' src='/images/logo.png' alt='Logo' />
        <div
          className='
        flex-row
        ml-8
        
        gap-7
        hidden
        lg:flex
        
        
        '
        >
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by languages' />
        </div>
        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'
        >
          <p className='text-white text-sm'>Browser</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visbile={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='flex flex-row items-center gap-2 cursor-pointer relative'
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <img src='/images/default-slate.png' alt='' />
            </div>
            /
            <BsChevronDown
              className={`text-white transition ${
                showaccountMenu ? 'rotate-180' : 'rotate-0'
              } `}
            />
            {/* 可以让图标点击的时候旋转，很帅 */}
            <AccountMenu visibel={showaccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
