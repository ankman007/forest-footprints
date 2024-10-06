'use client';

import Image from 'next/image';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        if(isDesktop) return;
        setIsOpen(!isOpen);
    }

    const isDesktop = useMediaQuery({ query: '(min-width: 922px)' });

    useEffect(() => {
        setIsOpen(false);
    }, [isDesktop]);

    return (
        <div className={`${styles.navbar_wrapper} fixed top-0 left-0 right-0 bg-primary-94 h-[60px] flex items-center`}>
            <div className="custom-container">
                <div className="flex  justify-between items-center">
                    <Image src={'/images/logo.png'} width={40} height={35} alt='logo' />

                    <ul className={`${styles.navlink_wrapper} ${isOpen ? styles.active : ''}  hidden lg:flex flex-col lg:flex-row items-center gap-4`}>
                        <li><Link onClick={toggleNavbar} href={`/`} className={`${styles.nav_link} ${styles.active} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Home</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/about`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>About</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/contact`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Contact</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/map`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Map</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/login`} className={`${styles.nav_link} bg-primary-80 text-center h-[40px] text-[16px] color-primary-10`}>Login/ Register</Link></li>
                    </ul>
                    {isOpen &&
                        <ul className={`${styles.navlink_wrapper} ${isOpen ? styles.active : ''}  flex-col lg:flex-row flex items-center gap-4`}>
                            <li className='flex justify-between'>
                               <div className="font-bold text-[18px] color-primary-90">FOREST FOOTPRINT</div>

                                <div onClick={toggleNavbar} className="menu lg:hidden cursor-pointer">
                                    <Image src={`images/close.svg`} width={24} height={24} alt='menu' />
                                </div>
                            </li>
                            <li><Link onClick={toggleNavbar} href={`/`} className={`${styles.nav_link} ${styles.active} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Home</Link></li>
                            <li><Link onClick={toggleNavbar} href={`/about`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>About</Link></li>
                            <li><Link onClick={toggleNavbar} href={`/contact`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Contact</Link></li>
                            <li><Link onClick={toggleNavbar} href={`/map`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Map</Link></li>
                            <li><Link onClick={toggleNavbar} href={`/login`} className={`${styles.nav_link} bg-primary-80 text-center h-[40px] text-[16px] color-primary-10`}>Login/ Register</Link></li>
                        </ul>
                    }

                    <div onClick={toggleNavbar} className="menu lg:hidden cursor-pointer">
                        <Image src={`images/menu.svg`} width={24} height={24} alt='menu' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
