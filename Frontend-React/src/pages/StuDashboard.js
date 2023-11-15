import React, { useEffect, useState } from 'react'
import './SecondaryCSS.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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


export default function StuDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const location = useLocation();
  const userData = location.state.userData;
  // const documentId = location.state.documentId;
  useEffect(() => {
    console.log(userData.UserName)
    // console.log(props) 
  }, [])

  const onClickupdate =()=>{
    console.log(userData)
    navigate('/StudentUpdateData', { state: { userData: userData } })
  }

  return (
    <section className=''>
      <section className='section1'>

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

        <section className='mainStudentDashboardBody'>
          <button className='bg-[#E32952] py-2 pr-4 pl-2 mr-4 ml-4 rounded-full cursor-pointer hover:bg-[#2546bd] text-white' onClick={onClickupdate}>UpdateData</button>
        </section>
        {/* <div id='slidesho2w' className='section1_maindata '>
          <div id="slideshow">
            <img id='fadeingani' className='fadeingani' src={charityImg1} />
          </div>

          <div className='section1_cover'></div>

          <div className='section1_covertext flex test_borde text-3xl sm:text-5xl text-white text-gradient py-1'>
            <div className='w-flex '>
              <p className='p1'>StudentDashboard</p>
              <hr className='hr1' />

              <p className='p2'>Under Development</p>
              <a href='#section2'><button className='b1 text-white mx-4 border-[1px] pt-2 pb-2 pl-6 pr-6 border-[aquamarine] hover:bg-[#3d4f7c] rounded-full cursor-pointer'>Learn More</button></a>
            </div>
          </div>
        </div> */}


      </section>






      <Footer />



    </section>
  )
}