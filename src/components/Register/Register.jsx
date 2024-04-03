import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";


const Register = () => {
    const [registerError, setregistergError] = useState('');
    const [registerSuccess, setregisterSuccess] = useState('')
    const [passwordShow, setPasswordShow] = useState(false)
    const handleregister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        setregistergError('');
        setregisterSuccess('');

        if (password.length < 6) {
            setregistergError(' Password should be at least 6 characters');
            return
        } 
        else if (!/[0-9]/.test(password)) {
            setregistergError('password should contain atleast one number and one uppercase and one special character');
            return
        }
        else if(!/[A-Z]/.test(password)){
            setregistergError('password should contain atleast one number and one uppercase and one  special character')
            return
        }
        else if(!accepted){
            setregistergError('Please Accept our Terms and Conditons')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                setregisterSuccess('User Register Successfully')
                console.log(user);
            })
            .catch(error => {
                setregistergError(error.message)
                console.error(error);
            })

    }
    return (
        <div className="w-3/5 mx-auto">
            <h2 className="text-center text-4xl font-bold">Register Now</h2>
            <form onSubmit={handleregister} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="input input-bordered w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <div className=" relative ">
                        <input
                            type={passwordShow ? 'text' : 'password'}
                            name="password"
                            placeholder="password"
                            className="input input-bordered w-full" required />
                        <span className="absolute top-4 right-3 " onClick={() => setPasswordShow(!passwordShow)}>
                            {
                                passwordShow ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div>
                    <input type="checkbox" name="terms" id="terms" className="mr-2" />
                    <label htmlFor="terms">Accept Our  <a className="underline text-warning" href="">Terms and Conditions</a></label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary text-white">Register Now</button>
                </div>
                <p>Already have a account? Please <Link className="text-blue-600 underline" to={'/login'}>Login</Link></p>
                {
                    registerError && <p className="text-red-600 mt-7">{registerError}</p>
                }
                {
                    registerSuccess && <p className="text-green-600 mt-7">{registerSuccess}</p>
                }
            </form>
        </div>
    );
};

export default Register;