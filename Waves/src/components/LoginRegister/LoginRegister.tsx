import { useState } from 'react'
import type { LoginData, LoginRegisterProp, RegisterData } from '../../lib/types'
import styles from './login.module.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



export const LoginRegister = ({ typeForm } : LoginRegisterProp) => {

    const { login, signUp, loading } = useAuth();
    const [dataRegister, setDataRegister] = useState<RegisterData>({email:'', password:'', name:'Carlos Arango'});
    const [dataLogin, setDataLogin] = useState<LoginData>({email: '', password: ''})
    const [errorRegister, setErrorRegister] = useState('')
    const navigate = useNavigate();

    // console.log(localStorage.getItem('userData'))
    const handleChange = (e:any) => {
        const { name, value } = e.target;

        if (typeForm === 'Sign up') {
            setDataRegister(prevState => ({
                ...prevState,
                [name]: value
            }))
        }

        if (typeForm === 'Log in') {
            setDataLogin(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (typeForm==='Sign up'){
            setErrorRegister('');
            try {
                const result = await signUp(dataRegister);
                // console.log('Peticion hecha: ', result)
            if (result.success) {
                // console.log('✅ Authentication successful, redirecting...')
                alert('Registro exitoso!');
                navigate('/app/dashboard');

            } else {
                setErrorRegister(result.error.message || 'Register Failed');
            }
            } catch (error: any) {
                setErrorRegister('Unexpected error occurred');
                console.error('Unexpected error ', error)
            }
            // console.log(dataRegister)
        }

        if (typeForm === 'Log in') {
            // console.log('Esto es login.')
            try {
                const result = await login(dataLogin);
                // console.log('Peticion hecha: ', result)
            if (result.success) {
                alert('Registro exitoso!');
                navigate('/app/dashboard');
            } else {
                setErrorRegister(result.error.message || 'Register Failed');
            }
            } catch (error: any) {
                setErrorRegister('Unexpected error occurred');
                console.error('Unexpected error ', error)
            }
            // console.log(dataLogin)
        }
    }

    return (
        <div className={styles.containerViewLogin}>
            <section className={styles.presentation}>
                <div className={styles.presentationL}>
                    {/* <img src="" alt="" /> */}
                    <h3>WAVES</h3>
                </div>
                <div className={styles.presentationR}>
                    <h2>Welcome Back!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
                </div>
            </section>
            <section className={styles.containerLogin}>
                <div className={styles.headerLogin}>
                    <h2>Welcome back!</h2>
                    <p>Start to create and Manage your own microservices</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.formLogin}>
                    <div className={styles.inputLogin}>
                        <div>
                            <span><img src="/icons/icon-email-gray.png" alt="" /></span>
                            <input type="email" name='email' placeholder='myemail@email.com' value={`${typeForm === 'Sign up' ? dataRegister.email : dataLogin.email}`} onChange={handleChange}/>
                        </div>
                        <div>
                            <span><img src="/icons/icon-password-gray.png" alt="" /></span>
                            <input type="password" placeholder='MyPassword' name='password' value={`${typeForm === 'Sign up' ? dataRegister.password : dataLogin.password}`} onChange={handleChange}/>
                        </div>
                    </div>

                    <div className={styles.btnLogin}>
                        <button type='submit' onClick={handleSubmit} disabled={loading}>{typeForm}</button>
                    </div>
                    {errorRegister && (
                        <div className={styles.errorRegister}>
                            {errorRegister}
                        </div>
                    )}
                </form>
            </section>
        </div>
        
    )
}