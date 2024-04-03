import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";


const Login = () => {
    const [loginError, setLogIngError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const emailRef = useRef(null)
    // const []
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setLogIngError('')
        setLoginSuccess('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    setLoginSuccess('Login successfuly')
                } else {
                    alert('please varify your email')
                }
                console.log(result.user);
            })
            .catch(error => {
                setLogIngError(error.message)
                console.error(error);
            })
    }
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log("please provide an email ");
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            console.log('Please write a valid email');
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("checked your mail");
            })
            .catch(error => {
                console.log(error.error);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200 rounded-xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center w-2/4 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                ref={emailRef}
                                name="email"
                                placeholder="email"
                                className="input w-full input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordShow ? "text" : "password"}
                                    name="password" placeholder="password"
                                    className="input input-bordered w-full" required />
                                <span className="absolute top-4 right-3 " onClick={() => setPasswordShow(!passwordShow)}>
                                    {
                                        passwordShow ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <label className="label">
                                <a
                                    onClick={handleForgotPassword}
                                    href="#"
                                    className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>You are new to this website please <Link className="text-blue-600 underline" to={'/register'}>Register</Link></p>
                        {
                            loginError && <p className="text-red-700">{loginError}</p>
                        }
                        {
                            loginSuccess && <p className="text-green-700">{loginSuccess}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;