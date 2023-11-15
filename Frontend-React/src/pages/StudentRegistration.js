import React, { useEffect, useState } from 'react'
import './SecondaryCSS.css';
import { addDoc, getDocs, collection, query, where } from "@firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';

import { firestore } from "./firebase_setup"

// import { HiMenuAlt4 } from "react-icons/";
// import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
// import logo from "../../images/logo.png";
import img1 from '../Assets/Images/test_bg.jpg';
import img2 from '../Assets/Images/test2_bg.jpg';
import { $ } from 'react-jquery-plugin'
import Footer from './Footer';
import validator from 'validator'


export default function StudentRegistration() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  const [userNameCheck,setUserNameCheck] = useState(0);

  const [Studentdetials, setStudentdetials] = useState({
    StudentFirstName: '',
    Student_FathersName: '',
    Student_Surname: '',
    Student_MailID: '',
    Student_DOB: '',
    Student_Gender: '',
    Student_UserName: '',
    StudentLogingPassword: '',

    // Grp1: '',
    // Student_IncomeCirtificateYes: '',
    // Student_IncomeCirtificateNo: '',

    Student_IncomeCirtificateNumber: '',
    Student_IncomeCirtificateNumber: '',
    Student_IncomeCirtificatefile: '',

    Student_BankAccountNumber: '',
    Student_BankIFSCCode: '',
    Student_BankBranchName: '',


    Student_10thSchoolName: '',
    Student_10thPassingYear: '',
    Student_10thPercentage: '',
    Student_10thBoard: '',
    Student_10thMarkSheetfile: '',

    Student_12thCollegeName: '',
    Student_12thPassingYear: '',
    Student_12thPercentage: '',
    Student_12thBoard: '',
    Student_12thMarkSheetfile: '',

    Student_AdmissionYear: '',
    Student_FathersName: '',
    Student_CollegeName: '',
    Student_CourseName: '',
    Student_CurrentCGPA: '',
    Student_YearOfStudy: '',
    Student_CET_Merit: '',
    Student_CourseName: '',
    Student_AdmissionYear: '',
    Student_FathersName: '',
    Student_CollegeName: '',
    Student_CourseName: '',
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
      setStudentdetials({
        ...Studentdetials, [e.target.name]: e.target.value
      })
      }
      else{
        setStudentdetials({
          ...Studentdetials, [e.target.name]: e.target.files[0]
        })
      }
    // console.log(Studentdetials)
    // return false;
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    const isStudentDetailsValid = Object.values(Studentdetials).every(val => val !== '');
    // console.log(isStudentDetailsValid , userNameCheck);
    // console.log((isStudentDetailsValid && userNameCheck));
    // if (isStudentDetailsValid && !userNameCheck) {
      if (!isStudentDetailsValid) {
      const refreg = collection(firestore, "StudentData") 
      // const docRef = doc(firestore, "StudentData", "sid");
      const reflogin = collection(firestore, "LoginCred")
      let { Student_IncomeCirtificatefile,Student_10thMarkSheetfile,Student_12thMarkSheetfile, ...dataReg } = Studentdetials; 

      // let dataReg =
      //   Studentdetials

      let datalogin =
        {UserName:'',
        Password:'',
      UserType:'Student'
    }
    datalogin.UserName = Studentdetials.Student_UserName
    datalogin.Password = Studentdetials.StudentLogingPassword
    const storage = getStorage();

      // console.log(data)
      try {
        const newDocRef = await addDoc(refreg, dataReg)
        let storageRef = ref(storage, `/files_Student/${newDocRef.id}_${Studentdetials.Student_UserName}/IncomeCirtificatefile`);
        await uploadBytesResumable(storageRef, Student_IncomeCirtificatefile);

        
        storageRef = ref(storage, `/files_Student/${newDocRef.id}_${Studentdetials.Student_UserName}/10thMarkSheetfile`);
        await uploadBytesResumable(storageRef, Student_10thMarkSheetfile);

        storageRef = ref(storage, `/files_Student/${newDocRef.id}_${Studentdetials.Student_UserName}/12thMarkSheetfile`);
        await uploadBytesResumable(storageRef, Student_12thMarkSheetfile);

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



  const onChangeUserNameCheck = async (e) =>{
    // console.log("e.val",e.target.value)
    // Handleonchange(e)
    // setStudentdetials({[Student_UserName]:e.target.value})
    // console.log("Studentdetials",Studentdetials)

    const usersRef = collection(firestore, 'LoginCred');
    // console.log(Studentdetials.userName)
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


  const ReturnUserNameCheck = ()=>{if(userNameCheck===1){
    // console.log("userNameCheck",userNameCheck)
    return("UserName Already Taken");}
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
            Student Registration
          </p>
        </div>
        <hr />
        <br />

        <div className="tab">
          <button className="tablinks active" onClick={event => clickHandle(event, 'PersonalDetails')}>Personal</button>
          <button className="tablinks" onClick={event => clickHandle(event, 'IncomeDetails')}>Income Details</button>
          <button className="tablinks" onClick={event => clickHandle(event, 'EducationDetails')}>Education Details</button>
          <button className="tablinks" onClick={event => clickHandle(event, 'CurrentCourseDetails')}>Current Course</button>
        </div>
        <form className='mainformStudentRegistration' onSubmit={handlesubmit} onChange={Handleonchange} >
          <div id="PersonalDetails" className="tabcontent activecontent RegisdivationContent">
            <div  >
              <div className='table'>


                <div className='row flex'>
                  <div className='col'>
                    <label>First Name :</label><br />
                    <input type="text" placeholder="First Name" name="StudentFirstName" id='Student_FirstName' />
                  </div>

                  <div className='col'>
                    <label>Father's Name :</label><br />
                    <input type="text" placeholder="Father's Name" name="Student_FathersName" id='Student_FathersName' />
                  </div>

                  <div className='col'>
                    <label>Surname :</label><br />
                    <input type="text" placeholder="Surname" name="Student_Surname" id='Student_Surname' />
                  </div>
                </div>



                <div className='row flex'>
                  <div className='col'>
                    <label>Phone Number :</label><br />
                    <input type="Number" placeholder="Number" name="Student_Number" id='Student_Surname' />
                  </div>

                  <div className='col'>
                    <label>Email :</label><br />
                    <input type="text" placeholder="Email" onChange={(e) => validateEmail(e)} name="Student_MailID" id='Student_MailID' /><br />
                    <span style={{ fontWeight: 'bold', color: 'red', }}>{emailError}</span>
                    {/* <span style={{fontWeight: 'bold', color: 'red',  }}><()=>{if(!(emailError === 'Valid'))return emailError}/></div></span> */}
                  </div>

                  <div className='col'>
                    <label>DOB :</label><br />
                    <input type="text" placeholder="DOB" name="Student_DOB" id='Student_DOB' />
                  </div>
                </div>


                <div className='row flex'>

                  <div className='col'>
                    <label>Gender :</label><br />
                    <input type="text" placeholder="Gender" name="Student_Gender" id='Student_Gender' />
                  </div>

                </div>

                <div className='row flex'>

                  <div className='col'>
                    <label>UserName :</label><br />
                    <input type="text" onChange={(e)=>onChangeUserNameCheck(e)} placeholder="UserName" name="Student_UserName" id='Student_UserName' />
                    <div className='ReturnUserNameCheck'><ReturnUserNameCheck/></div>
                  </div>

                </div>


                <div className='row flex'>

                  <div className='col'>
                    <label>Password :</label><br />
                    <input type="password" placeholder="Password" name="StudentLogingPassword" id='StudentLogingPassword' />
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


          <div id="IncomeDetails" className="tabcontent  RegisdivationContent">
            <div >
              <div className='table'>


                <div className='row flex'>
                  <div className='col'>
                    <label>Family Anual Income :</label>
                    <input type="number" placeholder="Family Anual Income" name="Student_FamilyAnualIncome" id='Student_FamilyAnualIncome' />
                  </div>

                  <div className='col'>
                    <label>Do you have a Income Cirtificate :</label><br />
                    {/* <label htmlFor="Student_IncomeCirtificateYes" style="">Do you have a Income Cirtificate :</label> */}
                    <input type="radio" id='Student_IncomeCirtificateYes' name="Grp1" value="yes" /> Yes
                    <input type="radio" name="Grp1" id='Student_IncomeCirtificateNo' value="no" /> No
                  </div>
                </div>



                <div className='row flex'>
                  <div className='col'>
                    <label>Income Cirtificate Number :</label><br />
                    <input type="Number" placeholder="Number" name="Student_IncomeCirtificateNumber" id='Student_IncomeCirtificateNumber' />
                  </div>

                  <div className='col'>
                    <label>Date Of Issue :</label><br />
                    <input type="text" placeholder="Date" name="Student_IncomeCirtificateDateOfIssue" id='Student_IncomeCirtificateDateOfIssue' />
                  </div>

                  <div className='col'>
                    <label>Upload Income Cirtificate :</label><br />
                    <input type="file" placeholder="Date" name="Student_IncomeCirtificatefile" id='Student_IncomeCirtificatefile' />
                  </div>

                  {/* <div className='col'>
                  <label>Email :</label><br />
                  <input type="text" placeholder="Email" onChange={(e) => validateEmail(e)} name="Student_Mail" id='Student_Mail' /><br />
                  <span style={{ fontWeight: 'bold', color: 'red', }}>{emailError}</span>
                  <span style={{fontWeight: 'bold', color: 'red',  }}><()=>{if(!(emailError === 'Valid'))return emailError}/></div></span>
                </div> */}

                </div>
                <br /><hr /><br />
                <label>Bank Details : </label><br /><br />
                <div className='row flex'>

                  <div className='col'>
                    <label>Acc No. :</label><br />
                    <input type="Number" placeholder="Acc No" name="Student_BankAccountNumber" id='Student_BankAccountNumber' />
                  </div>

                  <div className='col'>
                    <label>IFSC Code :</label><br />
                    <input type="text" placeholder="IFSC" name="Student_BankIFSCCode" id='Student_BankIFSCCode' />
                  </div>

                  <div className='col'>
                    <label>Branch Name :</label><br />
                    <input type="text" placeholder="Branch Name" name="Student_BankBranchName" id='Student_BankBranchName' />
                  </div>

                </div>



              </div>

              {/* <br />
              <div className='submitButton RegisdivationContent flex'>
                <button className=' b1 text-black mx-4 border-[5px] pt-2 pb-2 pl-6 pr-6 border-[red] hover:bg-[#3d4f7c] rounded-full cursor-pointer' type='submit' >Submit</button>
              </div> */}
            </div>
          </div>


          <div id="EducationDetails" className="tabcontent RegisdivationContent">
            <div >
              <div className='table'>
                <label>10th details</label>
                <div className='row flex'>
                  <div className='col'>
                    <label>School Name :</label><br />
                    <input type="text" placeholder="Name" name="Student_10thSchoolName" id='Student_10thSchoolName' />
                  </div>

                  <div className='col'>
                    <label>Passing Year :</label><br />
                    <input type="text" placeholder="Name" name="Student_10thPassingYear" id='Student_10thPassingYear' />
                  </div>

                  <div className='col'>
                    <label>Percentage :</label><br />
                    <input type="text" placeholder="Percentage" name="Student_10thPercentage" id='Student_10thPercentage' />
                  </div>
                </div>

                <div className='row flex'>
                  <div className='col'>
                    <label>Board :</label><br />
                    <input type="text" placeholder="Name" name="Student_10thBoard" id='Student_10thBoard' />
                  </div>

                  <div className='col'>
                    <label>Marksheet :</label><br />
                    <input type="file" placeholder="Date" name="Student_10thMarkSheetfile" id='Student_10thMarkSheetfile' />
                  </div>

                </div>

                <hr />

                <label>12th/Diploma details </label>
                <div className='row flex'>
                  <div className='col'>
                    <label>College Name :</label><br />
                    <input type="text" placeholder="Name" name="Student_12thCollegeName" id='Student_12thCollegeName' />
                  </div>

                  <div className='col'>
                    <label>Passing Year :</label><br />
                    <input type="text" placeholder="Name" name="Student_12thPassingYear" id='Student_12thPassingYear' />
                  </div>

                  <div className='col'>
                    <label>Percentage :</label><br />
                    <input type="text" placeholder="Percentage" name="Student_12thPercentage" id='Student_12thPercentage' />
                  </div>
                </div>

                <div className='row flex'>
                  <div className='col'>
                    <label>Board/Institute :</label><br />
                    <input type="text" placeholder="Name" name="Student_12thBoard" id='Student_12thBoard' />
                  </div>

                  <div className='col'>
                    <label>Marksheet :</label><br />
                    <input type="file" placeholder="Date" name="Student_12thMarkSheetfile" id='Student_12thMarkSheetfile' />
                  </div>

                </div>


              </div>

              {/* <br />
              <div className='submitButton RegisdivationContent flex'>
                <button className=' b1 text-black mx-4 border-[5px] pt-2 pb-2 pl-6 pr-6 border-[red] hover:bg-[#3d4f7c] rounded-full cursor-pointer' type='submit' >Submit</button>
              </div> */}
            </div>
          </div>



          <div id='CurrentCourseDetails' className="tabcontent  RegisdivationContent ">
            <div >
              <div className='table'>


                <div className='row flex'>
                  <div className='col'>
                    <label>Admission year in current course :</label><br />
                    <input type="text" placeholder="Year" name="Student_AdmissionYear" id='Student_AdmissionYear' />
                  </div>

                  <div className='col'>
                    <label>stuff :</label><br />
                    <input type="text" placeholder="Father's Name" name="Student_FathersName" id='Student_FathersName' />
                  </div>

                </div>



                <div className='row flex'>
                  <div className='col'>
                    <label>College Name :</label><br />
                    <input type="text" placeholder="Name" name="Student_CollegeName" id='Student_CollegeName' />
                  </div>

                  <div className='col'>
                    <label>Course Name :</label><br />
                    <input type="text" placeholder="Name" name="Student_CourseName" id='Student_CourseName' />
                  </div>

                  <div className='col'>
                    <label>Current CGPA :</label><br />
                    <input type="text" placeholder="CGPA" name="Student_CurrentCGPA" id='Student_CurrentCGPA' />
                  </div>
                </div>


                <div className='row flex'>

                  <div className='col'>
                    <label>Year Of Study :</label><br />
                    <input type="text" placeholder="Year" name="Student_YearOfStudy" id='Student_YearOfStudy' />
                  </div>

                  <div className='col'>
                    <label>CET/Merit :</label><br />
                    <input type="text" placeholder="Marks" name="Student_CET_Merit" id='Student_CET_Merit' />
                  </div>

                </div>
                <hr />
              </div>

              <br />

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