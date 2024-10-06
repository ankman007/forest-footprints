'use client';

import Image from 'next/image';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuth, setAuth] = useState(false);

    const [user, setUser] = useState<{ username: string, email: string }>({ username: '', email: '' });

    const toggleNavbar = () => {
        if (isDesktop) return;
        setIsOpen(!isOpen);
    }

    const pathname = usePathname();


    useEffect(() => {
        const isAuthenticated = () => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username")?.toString();
            const email = localStorage.getItem("email")?.toString();

            if (!token || !username || !email) {
                setAuth(false);
            } else {
                console.log(22)
                setAuth(true);
                setUser({ username, email })
            }
        }

        isAuthenticated();
    }, [])

    const isDesktop = useMediaQuery({ query: '(min-width: 922px)' });
    const [isdropOpen, setdroptOpen] = useState(false);

    const toggleDropDown = () => {
        setdroptOpen(!isdropOpen);
    }

    const onLogout = () => {
        localStorage.clear();
        location.reload();
        setdroptOpen(false);
    }

    useEffect(() => {
        setIsOpen(false);
    }, [isDesktop]);

    return (
        <div className={`${styles.navbar_wrapper} z-[10000] fixed top-0 left-0 right-0 bg-primary-94 h-[60px] flex items-center`}>
            <div className="custom-container">
                <div className="flex  justify-between items-center">
                    <Image src={'/images/logo.png'} width={40} height={35} alt='logo' />

                    <ul className={`${styles.navlink_wrapper} ${isOpen ? styles.active : ''}  hidden lg:flex flex-col lg:flex-row items-center gap-4`}>
                        <li><Link onClick={toggleNavbar} href={`/`} className={`${styles.nav_link} ${pathname == '/' ? styles.active : ''} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Home</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/team`} className={`${styles.nav_link} ${pathname == '/team' ? styles.active : ''} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Team</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/contact`} className={`${styles.nav_link} ${styles.down} ${pathname == '/contact' ? styles.active : ''} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Contact</Link></li>
                        <li><Link onClick={toggleNavbar} href={`/map`} className={`${styles.nav_link} ${styles.down} ${pathname == '/map' ? styles.active : ''} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Map</Link></li>
                        {
                            !isAuth &&
                            <li><Link onClick={toggleNavbar} href={`/login`} className={`${styles.nav_link} bg-primary-80 text-center h-[40px] text-[16px] color-primary-10`}>Login/ Register</Link></li>
                        }
                        {
                            isAuth &&
                            <li onClick={toggleDropDown} className='cursor-pointer relative border-primary-80 px-[16px] rounded-full h-[40px] text-[12px] color-primary-10'>
                                <Link href={`#`} className={`absolute top-[1px] left-4 min-w-[100px]`}>{user.username}</Link>
                                <div className="email pt-[12px] text-[16px]">{user.email}</div>
                                {isdropOpen &&
                                    <div onClick={onLogout} className="absolute top-full mt-[8px] py-[4px] bg-neutral-20 color-neutral-90 text-[14px] px-[8px] rounded-[4px] max-w-[200px] w-full">
                                        logout
                                    </div>
                                }
                            </li>
                        }

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
                            <li><Link onClick={toggleNavbar} href={`/team`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Team</Link></li>
                            <li><Link onClick={toggleNavbar} href={`/contact`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Contact</Link></li>
                            <li><Link onClick={toggleNavbar} href={`/map`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Map</Link></li>
                            {
                                !isAuth &&
                                <li><Link onClick={toggleNavbar} href={`/login`} className={`${styles.nav_link} bg-primary-80 text-center h-[40px] text-[16px] color-primary-10`}>Login/ Register</Link></li>
                            }
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
