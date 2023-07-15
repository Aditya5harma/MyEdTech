import React, { useState } from 'react';
import CountryCodes from '../../../data/countrycode.json'
import { useDispatch } from 'react-redux';
import {setsignupInfo} from '../../../slices/authorisation'
import { otpSend } from '../../../services/operations/autharisationAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SignupForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signupData, setsignupData] = useState({
                                                    accountType:"Student",
                                                    firstName:"",
                                                    lastName:"",
                                                    email:"",
                                                    password:"",
                                                    confirmPassword:"",
                                                    contactNumber:"",
                                                    countryCode: "+91"
                                                })


    const datachangeHandler = (e) => {
        const {name, value} = e.target

        const updateddata = {
            ...signupData,
            [name] : value
        }
        setsignupData(updateddata)
    }
    


    const submitHandler = async(e) => {
        e.preventDefault()
        // console.log(signupData)

        //password validation
        if (signupData.password !== signupData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
          }

        //store signup data in store for further use fill user provides valid otp.
        dispatch(setsignupInfo(signupData));
        console.log("things are getting dispatched")

        //otp sending 
        try {
            const response = await otpSend(signupData.email, navigate);
            console.log(`response - ${response}`)
        } catch (error) {
            console.log(error)
            toast.error(error)
        }

        // Reset form
        setsignupData({
            accountType:"Student",
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            contactNumber:"",
            countryCode:"+91"
        })
            

    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='input:checked ~ .radio '>
                <div className="flex justify-center items-center border-[2px] border-richblack-300 rounded-xl shadow-lg m-5 bg-richblack-800 w-fit mx-auto my-12">
                    <div className="bg-richblack-800 rounded-xl">
                        <div className="inline-flex rounded-xl">
                            <input onChange={datachangeHandler} type="radio" name="accountType" id="Student" checked ={signupData.accountType === 'Student'} value="Student" hidden/>
                            <label htmlFor="Student" className="radio text-center self-center py-2 px-5 rounded-xl cursor-pointer hover:opacity-75 font-semibold text-richblack-25">Student</label>
                        </div>
                        <div className="inline-flex rounded-xl">
                            <input onChange={datachangeHandler} type="radio" name="accountType" id="Instructor" checked ={signupData.accountType === 'Instructor'} value="Instructor" hidden/>
                            <label htmlFor="Instructor" className="radio text-center self-center py-2 px-4 rounded-xl cursor-pointer hover:opacity-75 font-semibold text-richblack-25">Instructor</label>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <div className='flex justify-between gap-3'>
                    <div className='flex flex-col'>
                        <label htmlFor="firstName" className=' text-sm text-richblack-25 font-inter font-semibold'>First Name :</label>              
                            <input
                                className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                                onChange={datachangeHandler}
                                id='firstName'
                                type='string'
                                name='firstName'
                                value={signupData.firstName}
                                placeholder='First Name'
                                required                                
                            />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="lastName" className=' text-sm text-richblack-25 font-inter font-semibold'>Last Name :</label>
                            <input
                                className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                                onChange={datachangeHandler}
                                id='lastName'
                                type='string'
                                name='lastName'
                                value={signupData.lastName}
                                placeholder='Last Name'                               
                            />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="emailid" className=' text-sm text-richblack-25 font-inter font-semibold'>Email Address :</label>
                        <input
                            className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                            onChange={datachangeHandler}
                            id='emailid'
                            type='email'
                            name='email'
                            value={signupData.email}
                            placeholder='xyz@gmail.com'
                            required                           
                        />
                </div>

                <div className='flex flex-col'>
                    <label className="text-sm text-richblack-25 font-inter font-semibold w-full ">Phone Number</label>

                    <div className='flex  gap-3'>
                            
                        <select
                            className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-[5.5rem] m-1'
                            onChange={datachangeHandler}
                            name='countryCode'
                            id='countryCode' 
                            value={signupData.countryCode}
                            required               
                        >
                            {
                                CountryCodes.map((countryCode,index) => (
                                    <option key={index} value={countryCode.code}>
                                        {countryCode.code} -{countryCode.country}                                
                                    </option>
                                ))
                            }
                        </select>
                        <input
                            className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-full m-1'
                            onChange={datachangeHandler}
                            type='tel'
                            id='contactNumber'
                            name='contactNumber'
                            value={signupData.contactNumber}
                            placeholder='987654321'
                            maxLength={10}
                            minLength={10}
                        />
                    </div>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className=' text-sm text-richblack-25 font-inter font-semibold'>create password :</label>
                            <input
                                className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white m-1'
                                onChange={datachangeHandler}
                                id='password'
                                type='password'
                                name='password'
                                value={signupData.password}
                                placeholder='Enter password'
                                required
                                
                            />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="confirmPassword" className=' text-sm text-richblack-25 font-inter font-semibold'>confirm password :</label>
                            <input
                                className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                                onChange={datachangeHandler}
                                id='confirmPassword'
                                type='password'
                                name='confirmPassword'
                                value={signupData.confirmPassword}
                                placeholder='Enter password'
                                required
                                
                            />
                    </div>
                </div>

                <button
                    type='submit'
                    className='border-1px border-blue-500 rounded-md px-4 py-2 bg-blue-200 text-white  m-1 my-[4rem] mx-auto w-full'
                >
                    Create Account
                </button>

                               
            </form>           
        </div>
    );
};

export default SignupForm;