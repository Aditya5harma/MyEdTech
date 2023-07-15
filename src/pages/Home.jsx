import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import MyButton from '../components/common/MyButton';
import banner from '../assets/Images/banner.mp4'
import HPBsection from '../components/core/homepage/HPBsection';
import Codeblock from '../components/core/homepage/codeblock';
import { Timeline } from '../data/timeline';
import { Link } from 'react-router-dom';


import timelineImage from '../assets/Images/TimelineImage.png'
import know_your_progress  from "../assets/Images/Know_your_progress.png"
import compare_with_others from "../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../assets/Images/Plan_your_lessons.png"
import Instructor from "../assets/Images/Instructor.png"
import Footer from '../components/common/Footer';



const Home = () => {
    return (
        <div className='bg-black w-screen min-h-screen overflow-hidden'>




            <div className='w-10/12 flex flex-col items-center justify-center mx-auto'>
                <div className='flex bg-richblack-800 relative top-[4vh] font-inter text-[16px] bg-slate-600 w-fit rounded-md justify-center items-center transition-all group'  >
                    <p className='px-[0.8rem] relative top-[-1px] py-[3px] text-richblack-50 group-hover:bg-richblack-900'>
                        <Link to='/signup' className='group-hover:pointer'>Become an instructor</Link>
                    </p>
                    <div className='text-[#999DAA] relative  px-[0.8rem] group-hover:pointer '>
                    <FaArrowRight ></FaArrowRight>  
                    </div>
                </div>

                <div  className='text-white font-bold  font-Inter text-[36px] my-[2rem] mt-[3rem] 	'>
                    Empower Your Future with <span className=' bg-gradient-to-r from-blue-200 to-yellow-100 text-transparent bg-clip-text font-bold'>Coding Skills</span>
                </div>
                <p className='mx-auto font-inter text-richblack-200 text-[16px] max-w-[85%] content-center'>
                     With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                     and get access to a wealth of resources,
                     including hands-on projects, quizzes,
                     and personalized feedback from instructors.
                </p>
                
                <div className='flex items-center gap-12 my-7'>
                    <MyButton text ={`learn more`} active = {true} link={"/signup"}></MyButton>
                    <MyButton text={"Book a demo"} active={false} link={"/login"}></MyButton>
                </div>




                <div className='w-11/12 my-5'>
                    <video
                    muted
                    loop
                    autoPlay><source  src={banner} type="video/mp4" /></video>
                </div>

                <div className='flex items-center gap-10 border-solid border-richblack-100 my-9'>
                    <HPBsection 
                    heading={"Unlock your coding potential with "} 
                    highlighted={"our online courses."}
                    content={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
                    primary={"Try It Yourself"} 
                    secondary={"Learn More"}/>

                    <Codeblock codeColor={"text-yellow-25"} 
                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`} className="mx-[-5rem]"/>
                </div>

                <div className='flex items-center gap-10 border-solid border-richblack-100 my-9'>
                    <Codeblock codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"text-yellow-25"}/>

                    <HPBsection 
                    heading={"Start"}
                    highlighted={" coding in seconds"}
                    content={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    primary={"Continue lesson"}
                    secondary={"Learn More"}/>
                </div>
            </div>



            <div className='bg-white text-richblack-700'>
                <div className='mx-auto  max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the Skills you need for a
                            <span className=' bg-gradient-to-r from-blue-200 to-yellow-100 text-transparent bg-clip-text font-bold text-[2.1rem]' > Job that is in demand</span>
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <MyButton active={true} link={"/signup"} text={"Learn more"}/>
                        </div>
                    </div>
        
        

                    <div className='flex flex-row gap-15 items-center'>
                        <div className='w-[45%] flex flex-col gap-5'>
                            {
                                Timeline.map( (element, index) => {
                                    return (
                                        <div className='flex flex-row gap-6' key={index}>
                                            <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                                <img src={element.Logo} alt='' />
                                            </div>

                                            <div>
                                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                                <p className='text-base'>{element.Description}</p>
                                            </div>
                                        </div>
                                    )
                                } )
                            }
                        </div>
                        <div className='relative shadow-blue-200'>

                            <img  src={timelineImage}
                                alt="timelineImage"
                                className='shadow-white object-cover h-fit'
                            />

                            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                                            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                                    <p className='text-3xl font-bold'>10</p>
                                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                                </div>

                                <div className='flex gap-5 items-center px-7'>
                                    <p className='text-3xl font-bold'>250</p>
                                    <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>

                <div className='mt-[130px] mb-32'>
                <div className='flex flex-col gap-5 items-center'>

                    <div className='text-4xl font-semibold text-center'>
                        Your Swiss Knife for
                        <span className=' bg-gradient-to-r from-blue-200 to-yellow-100 text-transparent bg-clip-text font-bold text-[2.1rem]'> learning any language</span>
                    </div>

                    <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </div>

                    <div className='flex flex-row items-center justify-center mt-5'>
                        <img 
                            src = {know_your_progress}
                            alt = "KNowYourProgressImage"
                            className='object-contain -mr-32 '
                        />
                        <img 
                            src = {compare_with_others}
                            alt = "KNowYourProgressImage"
                            className='object-contain'
                        />
                        <img 
                            src = {plan_your_lesson}
                            alt = "KNowYourProgressImage"
                            className='object-contain -ml-36'
                        />
                    </div>

                    <div className='w-fit mb-8'>
                        <MyButton active={true} link={"/signup"} text={"Learn more"}/>                                
                    </div>

                </div>
                </div>
            </div>



            <div className= 'w-10/12 translate-y-[-4rem] mx-auto'>
                <div className='flex flex-row gap-20 items-center'>
                    <div className='w-[50%]'>
                        <img
                            src={Instructor}
                            alt=""
                            className='shadow-white'
                        />
                    </div>

                    <div className='w-[50%] flex flex-col gap-8'>
                        <div className='text-4xl font-semobold w-[50%] text-white'>
                                Become an
                            <span className='bg-gradient-to-r from-blue-200 to-yellow-100 text-transparent bg-clip-text font-bold text-[2.1rem]'> Instructor</span>
                        </div>

                        <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>

                        <div className='w-fit'>
                            <MyButton active={true} link={"/signup"} text={"Start Learning Today"}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>       
    );
};

export default Home;


