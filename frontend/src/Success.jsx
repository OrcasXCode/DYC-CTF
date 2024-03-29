import React from 'react';
import success from "../src/assets/success1.mp4";


export function Success() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <video autoPlay muted loop className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0">
        <source src={success} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="text-center px-6 sm:px-0" style={{ fontFamily: 'oswald' }}>
          <div id="wrap">
              <div id="glitch" className='text-[40px] lg:text-[70px]' data-text="GLITCH" style={{fontFamily:'oswald'}}>Congratulations Coder !</div> 
            </div>
          <p className="mt-6 text-lg leading-8 text-gray-100">You have registered for the event.<span className='text-red-600'> Please note that our team will verify your payment and if we find it valid we will send you furthur details on your registered email. </span>Thank You !</p>
        </div>
      </div>
    </div>
  );
}
