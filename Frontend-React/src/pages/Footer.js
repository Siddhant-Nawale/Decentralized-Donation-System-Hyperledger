import React, { useEffect, useState } from 'react'
import './SecondaryCSS.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {

  return (
    <section className=''>
      <section id= "section6" className='section6'>
          <div className='flex'>
              <div className=' footer_divider a'/>
              <div className=' footer_data Footerpart1'>
                <p className='p1'>Heading Heading Heading</p>
                <p className='p2'>Nostrud aliquip sit excepteur cillum consequat ad. Voluptate magna sint et sint ex cupidatat do est voluptate aliqua ex et non. Eu occaecat fugiat excepteur irure aliqua commodo est tempor consequat labore Lorem voluptate.</p><br/>
                <p className='p2'>Nostrud aliquip sit excepteur cillum consequat ad. Voluptate magna sint et </p>
              </div>
              <div className=' footer_divider '/>
              <div className=' footer_data Footerpart2'>
                <p className='p1'>Contect</p>
                <p className='p2'>Genral<br/>Sample.something@gmail.com</p><br/>
                <p className='p2'>Support<br/>Support.something@gmail.com</p>
              </div>
              <div className=' footer_divider '/>
              <div className=' footer_data Footerpart3'>
                <p className='p1'>Information</p>
                <p className='p2'>Nostrud  </p>
                <p className='p2'>cillum consequat  </p>
                <p className='p2'>cillum consequat ad </p>
              </div>
              <div className=' footer_data Footerpart4'>
                <p className='p1'>Follow Us</p>
                <a href="https://www.youtube.com/c/"
                  className="youtube social">
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com/"
                  className="facebook social">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com/" className="twitter social">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/"
                  className="instagram social">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <br/>
                <br/>
                <p className='p6'>Smile Share</p>
                <p className='p2'>/\Copy Right Stuff/\</p>
                <p className='p2'>/\Copy Right Stuff/\</p>
                <p className='p2'>/\Copy Right Stuff/\</p>

              </div>
          </div>
      </section>
  


    </section>
  )
}