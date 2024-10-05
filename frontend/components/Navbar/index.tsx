import Image from 'next/image';
import styles from './navbar.module.scss';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className={`${styles.navbar_wrapper} bg-primary-94`}>
            <div className="custom-container">
                <div className="flex  justify-between items-center">
                    <Image src={'/images/logo.png'} width={40} height={35} alt='logo' />

                    <ul className='flex items-center gap-4'>
                        <li><Link href={`/`} className={`${styles.nav_link} ${styles.active} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Home</Link></li>
                        <li><Link href={`/contact`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Contact</Link></li>
                        <li><Link href={`/map`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>Map</Link></li>
                        <li><Link href={`/about`} className={`${styles.nav_link} ${styles.down} text-center block w-[88px] h-[60px] text-[16px] color-primary-10`}>About</Link></li>
                        <li><Link href={`/login`} className={`${styles.nav_link} bg-primary-80 text-center h-[40px] text-[16px] color-primary-10`}>Login/ Register</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
 