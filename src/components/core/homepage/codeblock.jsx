import React from 'react';
import { TypeAnimation } from 'react-type-animation'


const Codeblock = ({codeColor,codeblock}) => {
    return (
    
            <div className=' h-fit flex flex-row text-[0.9rem] min-w-[50%] py-4 lg:w-[500px] p-[3rem]'> 

                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                
                    style = {
                        {
                            whiteSpace: "pre-line",
                            display:"block",
                        }
                    }
                    omitDeletionAnimation={true}
                />
                </div>

            </div>

            
    );
};

export default Codeblock;