import React, { useEffect, useState } from 'react'
import './SecondaryCSS.css';
import './style.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
// import 'https://kit.fontawesome.com/a076d05399.js';
// import { HiMenuAlt4 } from "react-icons/";
// import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import logo from "../../images/logo.png";
import img1 from '../Assets/Images/test_bg.jpg';
import img2 from '../Assets/Images/test2_bg.jpg';
import charityImg1 from '../Assets/Images/Charity1.jpg';
import charityImg2 from '../Assets/Images/Charity2.jpg';
import charityImg3 from '../Assets/Images/Charity3.jpg';
import { $ } from 'react-jquery-plugin'
import Footer from './Footer';


export default function AboutUs() {

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const NavBarItem = ({ title, classprops }) => (
        <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
    );

    const [toggleMenu, setToggleMenu] = React.useState(false);



    return (
        <section className=''>
            <div className="about-section">
                <h1>About Us </h1>

                <p>Our platform exists to alleviate poverty by delivering impactful social initiatives in India. Aidchain enables individuals and institutions to donate funds to chosen causes, and delivers programs with high-impact outcomes across India. With a strong network of partners and a vast geographical presence, Aidchain brings people and organizations closer to realizing a poverty-free India.</p>
                <p>Give’s mission is to "make giving bigger and better". We are the most trusted giving platform in India. Through our technology solutions and services, we enable individuals and organizations to raise funds for, and donate to any cause they care about, with trust and convenience.</p>
            </div>

            <h2  >Our Team</h2>
            <div className="row">
                <div className="column">
                    <div className="card">

                        <div className="container">
                            <h2>Siddhant Nawale</h2>
                            <p className="title">Full Stack Developer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>siddhant.nawale20@vit.edu</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">

                        <div className="container">
                            <h2>Varun Gujarathi</h2>
                            <p className="title">Front-end Developer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>varun.gujarathi20@vit.edu</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">

                        <div className="container">
                            <h2>Siddhesh Wani</h2>
                            <p className="title">You Tuber & Digital Marketing Head</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>siddhesh.wani20@vit.edu</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--  FOOTER START --> */}

            <div className="footer">
                <div className="inner-footer">

                    {/* <!--  for company name and description --> */}
                    <div className="footer-items">
                        <h1>Aidchain</h1>
                        <p>Description of any product or motto of the company.</p>
                    </div>

                    {/* <!--  for quick links  --> */}
                    <div className="footer-items">
                        <h3>Quick Links</h3>
                        <div className="border1"></div> 
                        {/* <!--for the underline --> */}
                        <ul>
                            <a href="#"><li>Home</li></a>

                            <a href="#"><li>About</li></a>
                        </ul>
                    </div>

                    {/* <!--  for some other links --> */}
                    {/*  */}

                    {/* <!--  for contact us info --> */}
                    <div className="footer-items">
                        <h3>Contact us</h3>
                        <div className="border1"></div>
                        <ul>
                            <li><i className="fa fa-map-marker" aria-hidden="true"></i>XYZ, abc</li>
                            <li><i className="fa fa-phone" aria-hidden="true"></i>123456789</li>
                            <li><i className="fa fa-envelope" aria-hidden="true"></i>xyz@gmail.com</li>
                        </ul>

                        {/* <!--   for social links --> */}
                        <div className="social-media">
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-google-plus-square"></i></a>
                        </div>
                    </div>
                </div>

                {/* <!--   Footer Bottom start  --> */}
                <div className="footer-bottom">
                    Copyright &copy; Food and Burps 2020.
                </div>
            </div>
            <Footer />



        </section>
    )
}