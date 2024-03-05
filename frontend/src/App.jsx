import React, { useEffect, useState } from 'react';
import { ArrowRight, Trash2, PlusCircle,IndianRupee  } from 'lucide-react';
import dyc from './assets/dyc.png';
import upgrad from './assets/upgrad.png';
import lpu from './assets/lpu.png';
import code from './assets/glitch.mp4';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderId, setTeamLeaderId] = useState('');
  const [teamLeaderContactNo, setTeamLeaderContactNo] = useState('');
  const [participants, setParticipants] = useState([]);
  const [payNow,setPayNow]=useState(false);
  let count = 1;

  const handleParticipantAdd = () => {
    count++;
    if (count > 3) {
      alert('Cannot add more than 3 participants');
    } else {
      setParticipants([...participants, { name: '', email: '', id: '', contactNo: '' }]);
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const handleParticipantRemove = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
    count--;
  };

const handleSubmit = async () => {
  if (
    !teamName ||
    !teamLeaderName ||
    !teamLeaderId ||
    !teamLeaderEmail ||
    !teamLeaderContactNo ||
    participants.some(
      (participant) =>
        !participant.name ||
        !participant.id ||
        !participant.email ||
        !participant.contactNo
    )
  ) {
    // Validation failed, show error toast and return
    toast.error("Please fill in all required fields.");
    return;
  }

  // Prepare members array with the required format
  const membersArray = participants.map((participant) => ({
    name: participant.name,
    email: participant.email,
    id: participant.id,
    phoneNumber: participant.contactNo,
  }));

  const dataToSend = {
    teamName: teamName,
    teamLeaderName: teamLeaderName,
    teamLeaderEmail: teamLeaderEmail,
    teamLeaderNo: teamLeaderContactNo,
    teamLeaderId: teamLeaderId,
    members: membersArray,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/user/register",
      dataToSend
    );
    const responseData = response.data;

    if(responseData){
      setPayNow(true);
    }
    else{
      toast.error(responseData.msg);
    }
  } catch (error) {
    console.error("Error occurred while processing registration:", error);
    toast.error("Error while registration");
  }
};

const handlePayment = async () => {
    // Write your payment logic here
    // For example, you can redirect to a payment gateway or use a payment API
    // Once payment is successful, navigate to the success page
    // Ensure to handle errors and edge cases appropriately
    
    // if (responseData) {
    //   const amount = 20000;
    //   const currency = "INR";
    //   const receiptId = "qwsaq1";

    //   const paymentResponse = await fetch("http://localhost:3000/user/order", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       amount,
    //       currency,
    //       receipt: receiptId,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const order = await paymentResponse.json();
  
    //   var options = {
    //     key: "rzp_test_Hvy5xfrAb6RSaj",
    //     amount,
    //     currency,
    //     name: "Department Of Youth Capital",
    //     description: "Test Transaction",
    //     image: dycb,
    //     order_id: order.id,
    //     handler: async function (response) {
    //       const body = {
    //         ...response,
    //       };

    //       const validateRes = await fetch(
    //         "http://localhost:3000/user/order/validate",
    //         {
    //           method: "POST",
    //           body: JSON.stringify(body),
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       const jsonRes = await validateRes.json();
    //       window.location.href = '/success-page';
    //     },
    //     prefill: {
    //       name: "DYC",
    //       email: "omp164703@gmail.com",
    //       contact: "9429084446",
    //     },
    //     notes: {
    //       address: "Razorpay Corporate Office",
    //     },
    //     theme: {
    //       color: "#3399cc",
    //     },
    //   };
    //   var rzp1 = new window.Razorpay(options);
    //   rzp1.on("payment.failed", function (response) {
    //     alert(response.error.code);
    //     alert(response.error.description);
    //     alert(response.error.source);
    //     alert(response.error.step);
    //     alert(response.error.reason);
    //     alert(response.error.metadata.order_id);
    //     alert(response.error.metadata.payment_id);
    //   });
    //   rzp1.open();
    //   e.preventDefault();
    // } else {
    //   toast.error(responseData.msg);
    // }
  };


  return (
    <section className='bg-black'>
      <Toaster />
      <nav className='flex h-[100px] font-bold  w-full justify-between '>
        <img src={lpu} className=' h-[40px]' alt='Logo' />
        <div className='flex gap-4'>
          <img src={upgrad} className=' h-[40px]' alt='Logo' />
          <img src={dyc} className=' h-[40px]' alt='Logo' />
        </div>
      </nav>


    <div className="relative w-full">
      <div className="relative isolate z-0 px-6 pt-14 lg:px-8">
        <div className="relative mx-auto  max-w-2xl py-24">
          <div className="absolute -z-10 transform-gpu ">
            <video autoPlay muted loop src={code}></video>
          </div>
          <div className="text-center">
             <div id="wrap">
              <div id="glitch" className='text-[40px] lg:text-[70px]' data-text="GLITCH" style={{fontFamily:'oswald'}}>Code-A-THON</div> 
            </div>
            <p className="mt-6 text-lg leading-8 text-white" style={{fontFamily:'oswald'}}>
              If you think you are the best coder in town, let's test your limits! Welcome to the Capture The Flag registration. Please ensure that all details are entered accurately to avoid any inconvenience in the future.
            </p>
          </div>
        </div>
      </div>
    </div>


      <div  style={{fontFamily:'oswald'}} className='text-white flex items-center mt-[100px] justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-30'>
        <div className='h-full w-full mx-auto'>
          <form action='#' method='POST' className='mt-8  w-full flex items-center justify-center'>
            <div className='space-y-10'>
              <div>
                <label htmlFor='' className='text-base font-medium'>
                  Team Name
                </label>
                <div className='mt-2'>
                   <input
                    className="flex border-gray-300 h-10  rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="TEAM NAME"
                    id="firstName"
                     onChange={(e) => setTeamName(e.target.value)}
                  ></input>
                </div>

              </div>
              {/* {Team Leader} */}
              <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-5 md:space-y-0">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="fullName"
                  >
                    Team  Leader Name
                  </label>
                  <input
                    className="flex border-gray-300 h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full NamE"
                    id="fullName"
                     onChange={(e) => setTeamLeaderName(e.target.value)}
                  ></input>
                </div>

                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="Id"
                  >
                   Team Leader Registration Id
                  </label>
                  <input
                    className="flex h-10 w-full border-gray-300 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="ex: 122XXX86"
                    id="Id"
                     onChange={(e) => setTeamLeaderId(e.target.value)}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Team Leader Email Address
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border-gray-300 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Email address"
                    id="email"
                     onChange={(e) => setTeamLeaderEmail(e.target.value)}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phoneNumber"
                  >
                    Team Leader Contact No
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border-gray-300 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Contact No"
                    id="phoneNumber"
                     onChange={(e) => setTeamLeaderContactNo(e.target.value)}
                  ></input>
                </div>
              </div>
            
              
              {participants.map((participant, index) => (
                <div key={index}>
                   <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-5 md:space-y-0">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="firstName"
                  >
                   {index + 1 == 0 ? `Team Leader Name` : `Participant ${(index + 1)} Name `}
                  </label>
                  <input
                    className="flex border-gray-300 h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full NamE"
                    id="firstName"
                     onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                  ></input>
                </div>

                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="Id"
                  >
                   {index + 1 == 0 ? `Team Leader Registration Is` : `Participant ${(index + 1)} Registration Id`}
                  </label>
                  <input
                    className="flex h-10 w-full border-gray-300 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Registration No"
                    id="id"
                     onChange={(e) => handleParticipantChange(index, 'id', e.target.value)}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                   {index + 1 == 0 ? `Team Email Id` : `Participant ${(index + 1)} Email `}
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border-gray-300 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Email address"
                    id="email"
                     onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phoneNumber"
                  >
                   {index + 1 == 0 ? `Team Contact No` : `Participant ${(index + 1)} Contact No`}
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border-gray-300 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Contact No"
                    id="phoneNumber"
                     onChange={(e) => handleParticipantChange(index, 'phoneNumber', e.target.value)}
                  ></input>
                </div>
                <div className='w-full flex items-center justify-center h-10'>
                  <button className='mt-10' type='button' onClick={() => handleParticipantRemove(index)}>
                    <Trash2 className='text-red-700'></Trash2>
                  </button>
                </div>
              </div>
                </div>
              ))}

              {participants.length < 3 && (
                  <button type='button' onClick={handleParticipantAdd} class="btn one" >Add Participant <PlusCircle className='ml-2' size={16}/></button>
              )}
              <button type='button'  onClick={handleSubmit}  class="btn two">Register Now <ArrowRight className='ml-2' size={16} /></button>
              {payNow && <button type='button' onClick={handlePayment} class="btn three">Pay <IndianRupee  className='ml-2' size={16}></IndianRupee>400</button>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
