import React, { useEffect, useState } from 'react'
import './SecondaryCSS.css';
import { addDoc, getDocs, collection, query, where   } from "@firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { firestore } from "./firebase_setup"
import { useNavigate } from 'react-router-dom';


// import { HiMenuAlt4 } from "react-icons/";
// import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import logo from "../../images/logo.png";
import img1 from '../Assets/Images/test_bg.jpg';
import img2 from '../Assets/Images/test2_bg.jpg';
import { $ } from 'react-jquery-plugin'
import Footer from './Footer';
import validator from 'validator'


export default function CompanyRegistration() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  const [userNameCheck, setUserNameCheck] = useState(0);

  const [Companydetials, setCompanydetials] = useState({
    Company_Name: '',
    Company_Location: '',
    Contact_Details: '',
    Company_EmailID: '',
    Company_CSRReportLastY: '',
    Company_CSRReport2ndLastY: '',
    Company_UserName: '',
    Company_LogingPassword: '',
    // Personal Details Of CSR Authority:
    Company_CSRAuthority_Name: '',
    Company_CSRAuthority_Address: '',
    Company_CSRAuthority_ContactDetails: '',
    Company_CSRAuthority_EmailID: '',
    Company_CSRAuthority_CompanyId: '',

  })

  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('')
      console.log(emailError === 'Valid')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  const Handleonchange = async (e) => {
    e.preventDefault();
    if(!(e.target.type == "file")){
    setCompanydetials({
      ...Companydetials, [e.target.name]: e.target.value
    })
    }
    else{
      setCompanydetials({
        ...Companydetials, [e.target.name]: e.target.files[0]
      })
    }
    // console.log(e)
    // console.log(Companydetials)
    // return false;
  }


  const handlesubmit = async (e) => {
    e.preventDefault();

    const isCompanyDetailsValid = Object.values(Companydetials).every(val => val !== '');
    // console.log(isCompanyDetailsValid , userNameCheck);
    // console.log((isCompanyDetailsValid && userNameCheck));
    // if (isCompanyDetailsValid && !userNameCheck) {
      if (!isCompanyDetailsValid ) {
      const refreg = collection(firestore, "CompanyData")
      // const docRef = doc(firestore, "CompanyData", "sid");
      const reflogin = collection(firestore, "LoginCred")
      let { Company_CSRReportLastY,Company_CSRReport2ndLastY, ...dataReg } = Companydetials; 
// console.log("dataReg",dataReg,Company_CSRReportLastY)
      let datalogin =
      {
        UserName: '',
        Password: '',
        UserType:'Company'
      }
      datalogin.UserName = Companydetials.Company_UserName
      datalogin.Password = Companydetials.Company_LogingPassword


      const storage = getStorage();

      try {
        const newDocRef = await addDoc(refreg, dataReg)
        console.log(newDocRef)

        let storageRef = ref(storage, `/files_Company/${newDocRef.id}_${Companydetials.Company_UserName}/CSRReportLastY`);
        await uploadBytesResumable(storageRef, Company_CSRReportLastY);

        
        storageRef = ref(storage, `/files_Company/${newDocRef.id}_${Companydetials.Company_UserName}/CSRReport2ndLastY`);
        await uploadBytesResumable(storageRef, Company_CSRReport2ndLastY);

        
        // await uploadBytes(newDocRef, Company_CSRReportLastY);
        addDoc(reflogin, datalogin)
        navigate('/Login');

      } catch (err) {
        console.log(err)
      }

    }
  }


  function clickHandle(evt, Name) {
    let i, tabcontent, tablinks;

    // This is to clear the previous clicked content.
    tabcontent = document.getElementsByClassName("tabcontent")
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none"
    }

    // Set the tab to be "active".
    tablinks = document.getElementsByClassName("tablinks")
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "")
    }

    evt.currentTarget.className += " active"
    // console.log(document.getElementById(Name));
    document.getElementById(Name).style.display = "flex"
    // document.getElementById(Name).classList.add("mystyle");
  }



  const onChangeUserNameCheck = async (e) => {
    // console.log("e.val",e.target.value)
    // Handleonchange(e)
    // setCompanydetials({[Company_UserName]:e.target.value})
    // console.log("Companydetials",Companydetials)

    const usersRef = collection(firestore, 'LoginCred');
    // console.log(Companydetials.userName)
    const q = query(usersRef, where('UserName', '==', e.target.value));

    // const userDoc = doc(usersRef, username);
    const querySnapshot = await getDocs(q);
    // var userData ;
    // console.log("query",q);
    // console.log("querySnapshot.size",querySnapshot.size)
    if (querySnapshot.size === 0) {
      setUserNameCheck(0)
      // console.log(userNameCheck)
    } else {
      setUserNameCheck(1)
      // console.log(userNameCheck)

    }
  }


  const ReturnUserNameCheck = () => {
    if (userNameCheck === 1) {
      // console.log("userNameCheck",userNameCheck)
      return ("UserName Already Taken");
    }
  }

  return (
    <section className=''>
      <section className='section1'>

        {/* Navbar */}
        <nav className="w-full flex md:justify-center justify-between items-center pt-4 pb-4 nav">
          {/* logo */}
          <div className="md:flex-[0.9] text-white flex-initial justify-center items-center">
            {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
            Smile Share
          </div>

          {/* Buttons */}
          <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
            <Link to="/"><li className={'mx-4 cursor-pointer '}>Home</li></Link>

            {/* {[ "Browse"].map((item, index) => (
      <NavBarItem key={item + index} title={item} />
    ))} */}

            <Link to="/"><li className={'mx-4 cursor-pointer '}>About us</li></Link>

            {/* <Link to="/Register Charity"><li className={'mx-4 cursor-pointer '}>Register Charity</li></Link> */}

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

      </section>

      <section className='StuReg_Section1 '>
        <div className='heading '>
          <p className='p1'>
            Company Registration
          </p>
        </div>
        <hr />
        <br />

        <div className="tab">
          <button className="tablinks active" onClick={event => clickHandle(event, 'BasicDetails')}>Basic Details</button>
          <button className="tablinks" onClick={event => clickHandle(event, 'CSRReports')}>CRS Reports</button>
          <button className="tablinks" onClick={event => clickHandle(event, 'CSRAuthorityDetails')}>CSR Authority Details</button>
        </div>
        <form className='mainformCompanyRegistration' onSubmit={handlesubmit} onChange={Handleonchange} >
          <div id="BasicDetails" className="tabcontent activecontent RegisdivationContent">
            <div  >
              <div className='table'>


                <div className='row flex'>
                  <div className='col'>
                    <label>Company Name :</label><br />
                    <input type="text" placeholder="Name" name="Company_Name" id='Company_Name' />
                  </div>

                  <div className='col'>
                    <label>Company Location :</label><br />
                    <input type="text" placeholder="Location" name="Company_Location" id='Company_Location' />
                  </div>

                  <div className='col'>
                    <label>Email :</label><br />
                    <input type="text" placeholder="Email" onChange={(e) => validateEmail(e)} name="Company_EmailID" id='Company_EmailID' /><br />
                    <span style={{ fontWeight: 'bold', color: 'red', }}>{emailError}</span>
                  </div>

                </div>

                <div className='row flex'>
                  <div className='col'>
                    <label>Company Details :</label><br />
                    <textarea type="text" placeholder="Name" name="Contact_Details" id='Contact_Details' />
                  </div>
                </div>


                <div className='row flex'>
                  {/* <div className='col'>
                    <label>Phone Number :</label><br />
                    <input type="Number" placeholder="Number" name="Company_Number" id='Company_Number' />
                  </div> */}


                  <div className='col'>
                    <label>UserName :</label><br />
                    <input type="text" onChange={(e) => onChangeUserNameCheck(e)} placeholder="UserName" name="Company_UserName" id='Company_UserName' />
                    <div className='ReturnUserNameCheck'><ReturnUserNameCheck /></div>
                  </div>

                </div>



                <div className='row flex'>

                  <div className='col'>
                    <label>Password :</label><br />
                    <input type="password" placeholder="Password" name="Company_LogingPassword" id='Company_LogingPassword' />
                  </div>

                  <div className='col'>
                    <label>Re-Password :</label><br />
                    <input type="password" placeholder="Re-Password" name="Re_Password" id='Re_Password' />
                  </div>

                </div>


              </div>

              {/* <br />
              <div className='submitButton RegisdivationContent flex'>
                <button className=' b1 text-black mx-4 border-[5px] pt-2 pb-2 pl-6 pr-6 border-[red] hover:bg-[#3d4f7c] rounded-full cursor-pointer' type='submit' >Submit</button>
              </div> */}
            </div>
          </div>




          <div id="CSRReports" className="tabcontent  RegisdivationContent~">
            <div  >
              <div className='table'>


                <div className='row flex'>
                  <div className='col'>
                    <label>Company CSR Report Last Year :</label><br />
                    <input type="file" placeholder="Report" name="Company_CSRReportLastY" id='Company_CSRReportLastY' />
                  </div>

                  <div className='col'>
                    <label>Company CSR Report Second Last Year :</label><br />
                    <input type="file" placeholder="Report" name="Company_CSRReport2ndLastY" id='Company_CSRReport2ndLastY' />
                  </div>

                </div>


              </div>
            </div>
          </div>



          <div id="CSRAuthorityDetails" className="tabcontent  RegisdivationContent">
            <div >

              <strong><label>Personal Details Of CSR Authority : </label></strong><br /><br />

              <div className='table'>


                <div className='row flex'>
                  <div className='col'>
                    <label>Name :</label>
                    <input type="text" placeholder="Name" name="Company_CSRAuthority_Name" id='Company_CSRAuthority_Name' />
                  </div>

                  <div className='col'>
                    <label>Address :</label>
                    <input type="text" placeholder="Address" name="Company_CSRAuthority_Address" id='Company_CSRAuthority_Address' />
                  </div>

                </div>



                <div className='row flex'>
                  <div className='col'>
                    <label>Contact Number :</label><br />
                    <input type="Number" placeholder="Number" name="Company_CSRAuthority_ContactDetails" id='Company_CSRAuthority_ContactDetails' />
                  </div>

                  <div className='col'>
                    <label>Email ID :</label><br />
                    <input type="text" placeholder="Email ID" name="Company_CSRAuthority_EmailID" id='Company_CSRAuthority_EmailID' />
                  </div>

                  <div className='col'>
                    <label>Company CSR Authority Company ID :</label><br />
                    <input type="text" placeholder="ID" name="Company_CSRAuthority_CompanyId" id='Company_CSRAuthority_CompanyId' />
                  </div>

                  {/* <div className='col'>
                  <label>Email :</label><br />
                  <input type="text" placeholder="Email" onChange={(e) => validateEmail(e)} name="Company_Mail" id='Company_Mail' /><br />
                  <span style={{ fontWeight: 'bold', color: 'red', }}>{emailError}</span>
                  <span style={{fontWeight: 'bold', color: 'red',  }}><()=>{if(!(emailError === 'Valid'))return emailError}/></div></span>
                </div> */}

                </div>



              </div>

              {/* <br />
              <div className='submitButton RegisdivationContent flex'>
                <button className=' b1 text-black mx-4 border-[5px] pt-2 pb-2 pl-6 pr-6 border-[red] hover:bg-[#3d4f7c] rounded-full cursor-pointer' type='submit' >Submit</button>
              </div> */}
            </div>
          </div>

          <div className='RegistrationContentSubmitButton  flex'>
            <div className='  fex'>
              <button className=' b1 text-black mx4 border-[5px] pt-2 pb-2 pl-6 pr-6 border-[red] hover:bg-[#3d4f7c] rounded-full cursor-pointer' type='submit' >Submit</button>
            </div>
          </div>
        </form>



      </section>



      <Footer />



    </section >
  )
}