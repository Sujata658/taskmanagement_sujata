import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Login } from '@/Pages/Auth/Login';
import { toast } from 'sonner';
import HomeSheet from './SideSheet/Sheets';
import GreetNav from './Home/GreetNav';

interface JwtPayload {
    exp: number;
    [key: string]: any;
}
const Protected = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {

            setAccessToken(token);
            try {
                const decodedToken = parseJwt(token) as JwtPayload;
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    console.log('Token has expired!')
                    handleLogout();
                }
            } catch (error) {
                console.log('Error decoding token:', error)
                handleLogout();
            }
        } else {
            console.log('Navigating to login page')
            navigate('/login');
        }

    }, [navigate, accessToken]);
    const handleLogout = () => {
        toast('Session Expired! Please login again.');
        Cookies.remove('accessToken');
        localStorage.removeItem('accessToken');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };
    const parseJwt = (token: string): JwtPayload | null => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };
    return accessToken ?
        <div className='grid grid-cols-5 h-screen'>
            <div className='col-span-1'>

                <HomeSheet />
            </div>
            <div className='col-span-4' >
                <div>

                    <GreetNav />
                </div>
                <div>

                    <Outlet />
                </div>

            </div>

        </div>
        : <Login />
}

export default Protected