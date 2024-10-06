'use client';

import Link from 'next/link';
import styles from './login.module.scss';
import { APP_BASE_URL } from '@/utils/app';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'username':
                setUsername(value);
                break;

            case 'password':
                setPassword(value);
                break;

            default:
                break;
        }
    }

    const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                throw new Error('Username, email and password is required');
            }
            const body = { username, password };
            const res = await axios.post(`${APP_BASE_URL}/login`, body);

            const { message, success, token, email } = res.data as ({ message: string, success: string, token: string, email: string });
            if (!success) throw new Error();

            toast.success(message);

            if (!success) throw new Error();

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            router.push('/');

        } catch (error) {
            const errMsg = (error as Error).message || 'Error logging';
            toast.error(errMsg);
        }

    }

    return (
        <div className={`${styles.register_wrapper}`}>
            <Toaster />

            <form onSubmit={() => onSubmit} className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-[12px] pt-[32px] pb-[8px] bg-primary-10 border-primary-40 rounded-[8px] max-w-[350px] w-full'>
                <h3 className='color-primary-94 font-bold text-[18px] mb-[20px]'>Login</h3>

                <div className="inputbox mb-[12px]">
                    <label className='block color-primary-90 text-[14px] mb-[4px]'>Username</label>
                    <input onChange={onHandleChange} name="username" className='h-[56px] border-primary-40 bg-transparent color-primary-90 px-[12px] rounded-[8px] w-full' />
                </div>

                <div className="inputbox mb-[16px]">
                    <label className='block color-primary-90 text-[14px] mb-[4px]'>Password</label>
                    <input onChange={onHandleChange} name="password" className='h-[56px] border-primary-40 bg-transparent color-primary-90 px-[12px] rounded-[8px] w-full' />
                </div>

                <button onClick={() => onSubmit} type='submit' className='mb-[8px] bg-primary-90 color-primary-10 rounded-[8px] h-[56px] w-full'>Login</button>

                <div className='color-primary-76 text-[14px]'>
                    Already have an account?
                    <Link className='color-primary-90 underline ml-[8px]' href="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;