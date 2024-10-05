import Image from 'next/image';
import styles from './navbar.module.scss';

const Navbar = () => {
    return (
        <div className={`${styles.navbar_wrapper}`}>
            <p className='color-primary-40'>This is navbar</p>
            <Image src={'/logo.png'} width={65} height={60} alt='logo' />
        </div>
    )
}

export default Navbar;
