import Link from 'next/link';
import styles from './login.module.scss';

const Login = () => {
    return (
        <div className={`${styles.login_wrapper}`}>
            <form className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-[12px] pt-[32px] pb-[8px] bg-primary-10 border-primary-40 rounded-[8px] max-w-[350px] w-full'>
                <h3 className='color-primary-94 font-bold text-[18px] mb-[20px]'>Login</h3>

                <div className="inputbox mb-[12px]">
                    <label className='block color-primary-90 text-[14px] mb-[4px]'>Email</label>
                    <input className='h-[56px] border-primary-40 bg-transparent color-primary-90 px-[12px] rounded-[8px] w-full' />
                </div>

                <div className="inputbox mb-[16px]">
                    <label className='block color-primary-90 text-[14px] mb-[4px]'>Password</label>
                    <input className='h-[56px] border-primary-40 bg-transparent color-primary-90 px-[12px] rounded-[8px] w-full' />
                </div>

                <button type='submit' className='mb-[8px] bg-primary-90 color-primary-10 rounded-[8px] h-[56px] w-full'>Login</button>

                <div className='color-primary-76 text-[14px]'>
                    Already have an account?
                    <Link className='color-primary-90 underline ml-[8px]' href="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;