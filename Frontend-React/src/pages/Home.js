import React, { useEffect, useState } from 'react'
import './SecondaryCSS.css';
// import { HiMenuAlt4 } from "react-icons/";
// import { AiOutlineClose } from "react-icons/ai";
import {Link} from 'react-router-dom';
// import logo from "../../images/logo.png";
import img1 from '../Assets/Images/test_bg.jpg';
import img2 from '../Assets/Images/test2_bg.jpg';
import charityImg1 from '../Assets/Images/Charity1.jpg';
import charityImg2 from '../Assets/Images/Charity2.jpg';
import charityImg3 from '../Assets/Images/Charity3.jpg';
import { $ }  from 'react-jquery-plugin'
import Footer from './Footer';


export default function Home() {

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const NavBarItem = ({ title, classprops }) => (
          <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
        );

        const [toggleMenu, setToggleMenu] = React.useState(false);

// ______________________________________________________________
// Slideshow
$(document).ready(function () {
  var pic = $("#slideshow img:first");
  var images = [charityImg1,
    charityImg2,
    charityImg3,
  ];

  var i = 0;
  setInterval(function () {

      // Returns 0, 1, 2, 3, 0, 1, 2, ....
      i = (i + 1) % images.length;
      pic.fadeOut(1500,"linear", function () {
          $(this).attr("src", images[i]);
          $(this).fadeIn(1500,"linear");
      });
  }, 5000);
});

$(document).ready(function () {
  var pic = $("#slideshow1 img:first");
  var images = [charityImg1,
    charityImg2,
    charityImg3,
  ];

  var i = 0;
  setInterval(function () {

      // Returns 0, 1, 2, 3, 0, 1, 2, ....
      i = (i + 1) % images.length;
      pic.fadeOut(1500,"linear", function () {
          $(this).attr("src", images[i]);
          $(this).fadeIn(1500,"linear");
      });
  }, 5000);
});

// ______________________________________________________________
    
  const createcards = (title,data,link)=>{
    return(
      <div className='Section3_cards p-5 sm:w-3/12 flex flex-col justify-start items-center white-glassmorphism '>
            <div className=' Section4_card_contents'>
              <p> 
                {data}
              </p>
            </div>
            some good line
            <div className=''>
            <a href={link} ><button className='b1 text-black mx-4 border-[1px] pt-2 pb-2 pl-6 pr-6 border-[aquamarine] hover:bg-[#3d4f7c] rounded-md cursor-pointer'>View</button></a>
            </div>
          </div>
    );
  }



  return (
    <section className=''>
      <section className='section1'>
        
        {/* Navbar */}
        <nav className="w-full flex md:justify-center justify-between items-center pt-4 pb-4 nav">
          {/* logo */}
          <div className="md:flex-[0.9] text-white flex-initial justify-center items-center">
            {/* <img src={charityImg3} alt="logo" className="w-32 cursor-pointer" /> */}
            DDA
          </div>
          

          {/* Buttons */}
          <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            <Link to = "/"><li className={'mx-4 cursor-pointer '}>Home</li></Link>
    
            {/* {[ "Browse"].map((item, index) => (
              <NavBarItem key={item + index} title={item} />
            ))} */}

            <Link to = "/AboutUs"><li className={'mx-4 cursor-pointer '}>About us</li></Link>

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

        
        <div id='slidesho2w' className='section1_maindata '>
          <div id="slideshow">
            <img id='fadeingani' className='fadeingani'  src={charityImg1}/>
          </div>

          <div className='section1_cover'></div>

          <div className='section1_covertext flex test_borde text-3xl sm:text-5xl text-white text-gradient py-1'>
            <div className='w-flex '>
              <p className='p1'>Decentralised <br/>Donation Platform</p>   
              <hr className='hr1'/>
              
              <p className='p2'>No one has ever become poor by giving</p>
              <a href='./invokecsr'><button className='b1 text-white mx-4 border-[1px] pt-2 pb-2 pl-6 pr-6 border-[aquamarine] hover:bg-[#3d4f7c] rounded-full cursor-pointer'>Donate</button></a>
            </div>
          </div>        
        </div>


      </section>




      <section id= "section4 " className='section4'>
        
        <div className='heading '>
          <b><p className='p1'>Completed Projects</p></b>
        </div>
        <div className='cardholder'>
        {createcards("",
        "Aliquip ea dolore irure ut magna esse aute ut deserunt proident deserunt commodo id aute. Incididunt non deserunt commodo do laborum esse aliquip aliqua aliquip enim Lorem.",
        "")}
        {createcards("",
        "Aliquip ea dolore irure ut magna esse aute ut deserunt proident deserunt commodo id aute. Incididunt non deserunt commodo do laborum esse aliquip aliqua aliquip enim Lorem.",
        "")}
        {createcards("",
        "Aliquip ea dolore irure ut magna esse aute ut deserunt proident deserunt commodo id aute. Incididunt non deserunt commodo do laborum esse aliquip aliqua aliquip enim Lorem.",
        "")}
        {createcards("",
        "Aliquip ea dolore irure ut magna esse aute ut deserunt proident deserunt commodo id aute. Incididunt non deserunt commodo do laborum esse aliquip aliqua aliquip enim Lorem.",
        "")}
        {createcards("",
        "Aliquip ea dolore irure ut magna esse aute ut deserunt proident deserunt commodo id aute. Incididunt non deserunt commodo do laborum esse aliquip aliqua aliquip enim Lorem.",
        "")}
           
        </div>  
      </section>


      {/* <section id= "section5" className='section5'>
          
      </section> */}



      <Footer/>
  


    </section>
  )
}