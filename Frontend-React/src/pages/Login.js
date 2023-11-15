import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { setDoc, getDocs, collection, query, where } from "@firebase/firestore"
import { firestore } from "./firebase_setup"
// import { Route, Routes, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const handlesubmit = async (e) => {
        e.preventDefault();
        // const navigate = useNavigate();
        try {
            const usersRef = collection(firestore, 'LoginCred');


            // Use the doc() method to search for the user ID
            console.log(username,password)
            const q = query(usersRef, where('UserName', '==', username), where('Password', '==', password));

            // const userDoc = doc(usersRef, username);
            const querySnapshot = await getDocs(q);
            // var userData ;
            console.log(querySnapshot.docs)
            if (querySnapshot.size === 1) {
                // There is a user with the matching email and password
                const userDocSnapshot = querySnapshot.docs[0];
                
                const userData = userDocSnapshot.data();
                const documentId = userDocSnapshot.id;
                console.log('Logged in as:', userData.UserName);
                // console.log(userData)
                // window.location.replace("./StudentDashboard")
                navigate('/StudentDashboard', { state: { userData: userData } });

                // Do something with the user data
            } else {
                // There is no user with the matching email and password
            }


        } catch (error) {
            console.log('Error logging in:', error);
            // setAuthError(error.message);
        }
    }


    return (
        <div className='Login'>
                <nav className="w-full flex md:justify-center justify-between items-center pt-4 pb-4 nav">
                    {/* logo */}
                    <div className="md:flex-[0.9] text-black flex-initial justify-center items-center">
                        {/* <img src={charityImg3} alt="logo" className="w-32 cursor-pointer" /> */}
                        Smile Share
                    </div>


                    {/* Buttons */}
                    <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
                        <Link to="/"><li className={'mx-4 cursor-pointer '}>Home</li></Link>

                        {/* {[ "Browse"].map((item, index) => (
                <NavBarItem key={item + index} title={item} />
                ))} */}

                    <Link to="/"><li className={'mx-4 cursor-pointer '}>About us</li></Link>

                    {/* <Link to = "/"><li className={'mx-4 cursor-pointer'}>Charity</li></Link> */}


                    <a href='#section3'>
                        <button className="navbar_SpecialButton_right_border bg-[#E32952] py-2 pr-2 pl-4  ml-4 rounded-l-full cursor-pointer hover:bg-[#2546bd] text-white">
                            Login
                        </button>
                    </a>
                    <a href='#section3'>
                        <button className="bg-[#E32952] py-2 pr-4 pl-2 mr-4 rounded-r-full cursor-pointer hover:bg-[#2546bd] text-white">
                            SignUp
                        </button>
                    </a>

                </ul>
            </nav>

            <div className="container">
                <div className="logo">
                    {/* <img src="logo.png" alt="Logo" /> */}

                </div>
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={handlesubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />

                        <input type="submit" value="Login" />
                        {error && <p className="error">{error}</p>}
                    </form>
                    <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
                <div className="sign-up">
                    <p>New User? <a href="#">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}