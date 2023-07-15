import React from 'react';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import FoundingStory from '../assets/Images/FoundingStory.png';
import { Stats } from '../data/stats';
import ContactUsform from '../components/common/contactUsform';
import Footer from '../components/common/Footer';


const About = () => {
    return (
        <div className='bg-black w-screen min-h-[520vh] overflow-hidden overflow-y-hidden'>
            <div className='h-[500px] bg-richblue-900 relative'>

            </div>
            <div className='absolute top-20'>
                <div className='flex flex-col gap-[4rem] items-center z-[10] w-[55%] mx-auto'>
                    <h1 className='text-richblack-100 my-5 font-semibold'>
                        About Us
                    </h1>
                    <h1 className='text-white font-bold text-[1.8rem] font-inter flex flex-col items-center justify-center'>
                            Driving Innovation in Online Education for a 
                        <br />
                        <span className='text-caribbeangreen-200 py-4 text-[2rem]'> Brighter Future</span> 
                    </h1>
                    <p className='text-richblack-200 font-semibold text-sm'>
                        Studynotion is at the forefront of driving innovation in online education.
                        We're passionate about creating a brighter future by offering cutting-edge courses,
                        leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
                <div className='flex gap-5 h-[15rem] justify-center items-center my-[5rem] sm:flex-row'>
                    <img src={BannerImage1} alt="" className='w-[20rem] rounded-lg  shadow-lg shadow-richblack-100'/>
                    <img src={BannerImage2} alt="" className='w-[20rem] rounded-lg shadow-lg shadow-richblack-100'/>
                    <img src={BannerImage3} alt="" className='w-[20rem] rounded-lg shadow-lg shadow-richblack-100' />
                </div>
                <div className='w-[60%] mx-auto text-2xl font-semibold text-center leading-[3rem] italic text-white font-inter'>
                    "We are passionate about revolutionizing the way we learn. 
                    Our innovative platform combines technology, expertise, and 
                    community to create an unparalleled educational experience."
                </div>
                <div className='w-[75%] mx-auto'>
                    <section>
                        <div className="mx-auto flex  max-w-maxContent flex-col justify-between gap-5 text-richblack-500">
                        <div className="flex flex-col items-center gap-6 lg:flex-row justify-between">
                            <div className="my-24 flex lg:w-[50%] flex-col gap-6">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent p-1 z-10">
                                Our Founding Story
                            </h1>
                            <p className="text-base font-medium text-richblack-300 ">
                                Our e-learning platform was born out of a shared vision and
                                passion for transforming education. It all began with a group of
                                educators, technologists, and lifelong learners who recognized
                                the need for accessible, flexible, and high-quality learning
                                opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                As experienced educators ourselves, we witnessed firsthand the
                                limitations and challenges of traditional education systems. We
                                believed that education should not be confined to the walls of a
                                classroom or restricted by geographical boundaries. We
                                envisioned a platform that could bridge these gaps and empower
                                individuals from all walks of life to unlock their full
                                potential.
                            </p>
                            </div>

                            <div>
                            <img
                                src={FoundingStory}
                                alt=""
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                            />
                            </div>
                        </div>
                        <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create an
                                e-learning platform that would revolutionize the way people
                                learn. Our team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a
                                dynamic and interactive learning experience.
                            </p>
                            </div>
                            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                            Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                            </div>
                        </div>
                        </div>
                    </section>
                </div>
                <div>
                    <div className="bg-richblack-800">
                        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
                            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                            {Stats.map((data, index) => {
                                return (
                                <div className="flex flex-col py-10" key={index}>
                                    <h1 className="text-[30px] font-bold text-richblack-5">
                                    {data.count}
                                    </h1>
                                    <h2 className="font-semibold text-[16px] text-richblack-300">
                                    {data.label}
                                    </h2>
                                </div>
                                );
                            })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-auto'>
                    <h1 className="text-center text-4xl font-semibold text-richblack-25 p-5 my-5 mt-10">Get in Touch</h1>
                    <p className="text-center text-richblack-300 mt-3">
                        We&apos;d love to here for you, Please fill out this form.
                    </p>
                    <ContactUsform/>
                </div>
                

                {/* review section remaining */}

                <Footer/>

           </div>
            
        </div>
    );
};

export default About;