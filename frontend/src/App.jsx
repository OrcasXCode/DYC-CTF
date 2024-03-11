import React from 'react';
import { ArrowRight} from 'lucide-react';
import dyc from './assets/dyc.png';
import upgrad from './assets/upgrad.png';
import lpu from './assets/lpu.png';
import grid from './assets/grid.png';
import code from './assets/glitch.mp4';
import aboutlpu from './assets/about-lpu.png';
import lpucircle from './assets/lpucircle.png';



export function App() {

const faq = [
  {
    "que": "What is Capture The Flag (CTF) ?",
    "ans": "Capture The Flag (CTF) is a cybersecurity competition where participants attempt to solve a variety of challenges to uncover hidden 'flags' placed within vulnerable systems, applications, or networks."
  },
  {
    "que": "How can I participate in CTF events ?",
    "ans": "To participate in CTF events, you can join online platforms hosting CTF competitions or attend local CTF events. Many CTF platforms offer challenges of varying difficulty levels, allowing participants to test their skills in areas such as cryptography, reverse engineering, web exploitation, and more."
  },
  {
    "que": "Do I need prior experience to participate in CTF ?",
    "ans": "While prior experience in cybersecurity can be helpful, it's not always necessary to participate in CTF events. Beginners are welcome to join and learn from the challenges offered. CTF events often include challenges suitable for all skill levels, so don't hesitate to get started!"
  },
  {
    "que": "What skills do I need to excel or accomplish in CTF ?",
    "ans": "To excel in CTF, it's beneficial to have a strong understanding of various cybersecurity concepts, including but not limited to cryptography, programming, networking, and system administration. Additionally, problem-solving skills, attention to detail, and perseverance are essential qualities for success in CTF competitions."
  }
];



  return (
    <section className='bg-black h-screen scrool-smooth'>
      <nav className='flex h-[100px] font-bold  w-full justify-between '>
        <img src={lpu} className=' h-[70px]' alt='Logo' />
        <div className='flex gap-4'>
          <img src={dyc} className=' h-[60px]' alt='Logo' />
        </div>
      </nav>


     <div className="relative max-w-9xl h-screen bg-black overflow-hidden">
      <video autoPlay muted loop className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0">
        <source src={code} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="text-center px-6 sm:px-0" style={{ fontFamily: 'oswald' }}>
           <div id="wrap">
              <div id="glitch" className='text-[40px] lg:text-[70px]' data-text="GLITCH" style={{fontFamily:'oswald'}}>HACK - QUEST</div> 
            </div>
              <p className="mt-6 max-w-7xl text-lg leading-8 text-white" style={{fontFamily:'oswald'}}>
              <span className='text-red-600'>If you think you are the best coder in town, let's test your limits! </span>Welcome to the Capture The Flag registration. Please ensure that all details are entered accurately to avoid any inconvenience in the future.
            </p>       
          <button  onClick={() => window.location.href="#register"} className="text-white border mt-[40px] w-[200px] h-[50px] hover:bg-white hover:text-black">
            <span>REGISTER NOW</span>
          </button>
        </div>
      </div>
    </div>


    <div className="mx-auto max-w-9xl h-screen flex items-center justify-center px-2 py-10 lg:px-0 bg-[#212224]" style={{backgroundImage: `url(${grid})`,backgroundSize: 'cover', backgroundPosition: 'center', fontFamily:'oswald'}}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-10">
        <div className="mb-10 p-[100px] w-full md:w-2/3 lg:mb-0 lg:w-1/2">
          <img
            className=" rounded-md object-cover"
            src={upgrad}
            alt="UpGrad Campus"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 text-white" style={{fontFamily:'oswald'}}>
          <p className="text-sm font-bold text-center">Knowledge Partner</p>
           <div id="wrap" className='mt-5'>
              <div id="glitch" className=' text-2xl lg:text-2xl' data-text="GLITCH" style={{fontFamily:'oswald'}}>UpGrad Campus</div> 
            </div>
          <p className="mt-4 text-center">
            "UpGrad" is an Indian online higher education platform that offers a variety of programs in collaboration with universities and industry partners.
            There certification programs are designed for college students and freshers. They offer a placement support program that includes:
              <span className='text-red-600'> Soft skill training , 
              Aptitude test , 
              Mock interviews , 
              Group discussions ,
              Three guaranteed interviews with companies</span>
          </p>
        </div>
      </div>
    </div>



    <section className="max-w-9xl px-2 py-10 md:px-0 " style={{backgroundImage: `url(${grid})`,backgroundSize: 'cover', backgroundPosition: 'center', fontFamily:'oswald'}}>
      <div>
        <div className="mx-auto mt-5 max-w-2xl lg:text-center">
          <div id="wrap">
              <div id="glitch" className='text-[40px] lg:text-[50px]' data-text="GLITCH" style={{fontFamily:'oswald'}}>What is CTF ?</div> 
            </div>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400 lg:mx-auto">
            Capture The Flag (CTF) is a cybersecurity competition where participants attempt to solve a variety of challenges to uncover hidden "flags" placed within vulnerable systems, applications, or networks.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {faq.map((faqs,index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-white">{faqs.que}</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-400">
                {faqs.ans}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

          <div style={{textAlign:'center',fontFamily:'oswald'}} className="flex flex-col items-center justify-center bg-[#282828] ">
            <div className="w-full max-w-[1104px]  py-[30px] px-5 max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
                    <div style={{textAlign:'center'}}  className="flex flex-col items-center my-auto max-md:mt-10">
                        <div id="wrap">
                          <div id="glitch1" className='text-3xl lg:text-5xl text-red-600' data-text="GLITCH" style={{fontFamily:'oswald'}}>50+</div> 
                        </div>
                        <div className="max-w-4xl mt-3 text-base text-gray-400 md:text-xl">
                            CTF's challenge's
                        </div>
                    </div>
                </div>
        
               

                <div className="flex flex-col  items-stretch w-[48%] ml-5 max-md:w-full max-md:ml-0">
                    <div style={{textAlign:'center'}}  className=" flex grow flex-col items-stretch w-full pl-14 pr-16 pt-4 pb-7 max-md:max-w-full max-md:mt-10 max-md:px-5">
                        <div id="wrap">
                          <div id="glitch1" className='text-3xl lg:text-5xl text-red-600' data-text="GLITCH" style={{fontFamily:'oswald'}}>50000+</div> 
                        </div>
                        <div className="max-w-4xl mt-3 text-base text-gray-400 md:text-xl">
                            Price Pool Worth Upto
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-stretch w-[27%] ml-5 max-md:w-full max-md:ml-0">
                    <div style={{textAlign:'center'}}  className="flex flex-col items-stretch my-auto max-md:mt-10">
                       <div id="wrap">
                          <div id="glitch1" className='text-3xl lg:text-5xl text-red-600' data-text="GLITCH" style={{fontFamily:'oswald'}}>500+</div> 
                        </div>
                        <div className="max-w-4xl mx-auto mt-3 text-base text-gray-400 md:text-xl">
                            Participants
                        </div>
                    </div>
                </div>
                </div>
            </div>
          </div>


    <div className="relative w-full  bg-black" style={{backgroundImage: `url(${grid})`,backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <img className='h-[50px] w-[50px]' src={lpucircle}></img>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
            About <span className='text-[#e97b1c]'>LPU</span>
          </h1>
          <p className="mt-8 text-lg text-gray-400">
           <span className='text-[#e97b1c]'>Lovely Professional University </span> , renowned for its academic excellence, boasts a modern campus and offers over <span className='text-[#e97b1c]'>150 professional programs.</span> With a diverse community from across India and over  <span className='text-[#e97b1c]'>40 countries</span>, LPU is a global melting pot. Highlighting its commitment to quality, LPU has been awarded the prestigious  <span className='text-[#e97b1c]'>NAAC A++</span>  grade with an impressive score of  <span className='text-[#e97b1c]'>3.68/4</span> by the UGC's National Assessment & Accreditation Council, setting it apart as a leading institution in India.
          </p>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className=" object-cover lg:aspect-[4/3] lg:h-[500px] xl:aspect-[16/9]"
            src={aboutlpu}
            alt=""
          />
        </div>
      </div>
    </div>


    <div id='register' className="mx-autos max-w-9xl px-2 py-10 lg:px-0 flex items-center justify-center bg-black" style={{fontFamily:'oswald',backgroundImage: `url(${grid})`,backgroundSize: 'cover', backgroundPosition: 'center', fontFamily:'oswald'}}>
      <div className="flex flex-col max-w-7xl lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full md:w-1/2 lg:ml-16">
          <h2 className="text-3xl font-bold text-white">Register for <span className='text-red-600'> HACK - QUEST</span></h2>
          <p className="mt-2 text-gray-400">
            Reserve your spot now for the upcoming Hack - Quest Don't miss out on this exciting opportunity to showcase your coding skills and compete against the best. 
          </p>
        </div>
        <div className="mt-10 w-full md:w-1/2 lg:mt-0">
          <form className="flex lg:justify-center">
            <div className="flex w-full max-w-md items-center space-x-2">
              <button className='w-full' type='button' onClick={()=>{ window.location.href = "/register"}} class="btn four">REGISTER NOW  <ArrowRight className='ml-2' size={16} /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  );
}
