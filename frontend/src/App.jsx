import React, { useEffect, useState } from 'react';
import { ArrowRight, Trash2, PlusCircle } from 'lucide-react';
import dyc from './assets/dyc.png';
import dycb from './assets/DYCB.png';
import lpu from './assets/lpu.png';
import axios from 'axios';

export function App() {
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
  const [teamLeaderId, setTeamLeaderId] = useState(null);
  const [teamLeaderContactNo, setTeamLeaderContactNo] = useState(null);
  const [participants, setParticipants] = useState([]);
  let count = 1; // Initialize count outside of the function

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
    count--; // Decrement count when removing a participant
  };

const handleSubmit = async () => {
    // Validate inputs
    if (
      !teamName ||
      !teamLeaderName ||
      !teamLeaderId ||
      !teamLeaderEmail ||
      !teamLeaderContactNo ||
      participants.some(participant => !participant.name || !participant.id || !participant.email || !participant.contactNo)
    ) {
      alert("All fields are required");
      return;
    }

    // Prepare members array with the required format
    const membersArray = participants.map(participant => ({
      name: participant.name,
      email: participant.email,
      id: participant.id,
      phoneNumber: participant.contactNo
    }));

    // Prepare data to send
    const dataToSend = {
      teamName: teamName,
      teamLeaderName: teamLeaderName,
      teamLeaderEmail: teamLeaderEmail,
      teamLeaderNo: teamLeaderContactNo,
      teamLeaderId: teamLeaderId,
      members: membersArray
    };

    try {

      const response = await axios.post('http://localhost:3000/user/register', dataToSend);
      const responseData = response.data;
      console.log(responseData)

      if (responseData) {
        const amount = 20000;
        const currency = "INR";
        const receiptId = "qwsaq1";

        const paymentResponse = await fetch("http://localhost:3000/user/order", {
          method: "POST",
          body: JSON.stringify({
            amount,
            currency,
            receipt: receiptId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const order = await paymentResponse.json();
        console.log(order);

        var options = {
      key: "rzp_test_Hvy5xfrAb6RSaj",
      amount, 
      currency,
      name: "Department Of Youth Capital", 
      description: "Test Transaction",
      image: dycb,
      order_id: order.id, 
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:3000/user/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Web Dev Matrix", //your customer's name
          email: "webdevmatrix@example.com",
          contact: "9000000000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } 
    else {
        alert(responseData.msg);
    }
    } catch (error) {
      console.error('Error occurred while processing registration:', error);
      alert("Error occurred while processing registration");
    }
  };

  // const amount = 20000;
  // const currency = "INR";
  // const receiptId = "qwsaq1";

  // const paymentHandler = async (e) => {
  //   const response = await fetch("http://localhost:3000/user/order", {
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
  //   const order = await response.json();
  //   console.log(order);

  //   var options = {
  //     key: "rzp_test_Hvy5xfrAb6RSaj", // Enter the Key ID generated from the Dashboard
  //     amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency,
  //     name: "Department Of Youth Capital", //your business name
  //     description: "Test Transaction",
  //     image: dycb,
  //     order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
  //       console.log(jsonRes);
  //     },
  //     prefill: {
  //       //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
  //       name: "Web Dev Matrix", //your customer's name
  //       email: "webdevmatrix@example.com",
  //       contact: "9000000000", //Provide the customer's phone number for better conversion rates
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
  // };



  return (
    <section className='bg-black'>
      <nav className='flex h-[100px] font-bold w-full justify-between '>
        <img src={dyc} className='mr-3 h-25' alt='Logo' />
        <img src={lpu} className='mr-3 h-20' alt='Logo' />
      </nav>
      <div className='text-white flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-30'>
        <div className='h-full w-full mx-auto'>
        <div class="wrap">
            <div class="glitch" data-text="GLITCH" style={{fontFamily:'oswald'}}>  Code-A-THON  </div> 
        </div>
          <p className='mt-2 text-center text-xl tracking-wider line-spac' style={{ fontFamily: 'techno' }}>
            Welcome to the CTF (Capture The Flag) registration! Please ensure that all details are entered accurately
            to avoid any inconvenience in the future.
          </p>
          <form action='#' method='POST' className='mt-8 w-full flex items-center justify-center'>
            <div className='space-y-10'>
              <div>
                <label htmlFor='' className='text-base font-medium'>
                  Team Name
                </label>
                <div className='mt-2'>
                  <input
                    className='flex h-10 w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                    type='text'
                    placeholder='Team Name'
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

              </div>
              {/* {Team Leader} */}
              <div className='flex items-center flex-wrap justify-between lg:space-x-5'>
                <div>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='' className='text-base font-medium '>
                      Team Leader Name
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='text'
                      placeholder='FullName'
                      value={teamLeaderName}
                      onChange={(e) => setTeamLeaderName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='' className='text-base font-medium '>
                      Team Leader Registration Id
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='text'
                      placeholder='ex: 122***86'
                      value={teamLeaderId}
                      onChange={(e) => setTeamLeaderId(parseInt(e.target.value))}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='' className='text-base font-medium'>
                      Team Leader Email Address
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='text'
                      placeholder='Email address'
                      value={teamLeaderEmail}
                      onChange={(e) => setTeamLeaderEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='' className='text-base font-medium '>
                      Team Leader Contact No
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      type='text'
                      placeholder='Contact No'
                      value={teamLeaderContactNo}
                      onChange={(e) => setTeamLeaderContactNo(parseInt(e.target.value))}
                    ></input>
                  </div>
                  
                </div>
                <button className='mt-10' type='button' onClick={() => handleParticipantRemove(index)}>
                      <Trash2 className='text-black'></Trash2>
                    </button>
              </div>
              {participants.map((participant, index) => (
                <div key={index}>
                  <div className=' flex items-center flex-wrap justify-between'>
                    <div>
                      <div className='flex items-center justify-between'>
                        <label htmlFor='' className='text-base font-medium '>
                          {index + 1 == 0 ? `Team Leader Name` : `Participant ${(index + 1)} Name `}
                        </label>
                      </div>
                      <div className='mt-2'>
                        <input
                          className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                          type='text'
                          placeholder='FullName'
                          value={participants[index].name}
                          onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center justify-between'>
                        <label htmlFor='' className='text-base font-medium '>
                          {index + 1 == 0 ? `Team Leader Registration Is` : `Participant ${(index + 1)} Registration Id`}
                        </label>
                      </div>
                      <div className='mt-2'>
                        <input
                          className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                          type='text'
                          placeholder='Registration No'
                          value={participants[index].id}
                          onChange={(e) => handleParticipantChange(index, 'id', parseInt(e.target.value))}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center justify-between'>
                        <label htmlFor='' className='text-base font-medium '>
                          {index + 1 == 0 ? `Team Email Id` : `Participant ${(index + 1)} Email `}
                        </label>
                      </div>
                      <div className='mt-2'>
                        <input
                          className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                          type='text'
                          placeholder='Email address'
                          value={participants[index].email}
                          onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center justify-between'>
                        <label htmlFor='' className='text-base font-medium '>
                          {index + 1 == 0 ? `Team Contact No` : `Participant ${(index + 1)} Contact No`}
                        </label>
                      </div>
                      <div className='mt-2'>
                        <input
                          className='flex h-10  w-[300px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                          type='text'
                          placeholder='Contact No'
                          value={participants[index].contactNo}
                          onChange={(e) => handleParticipantChange(index, 'contactNo', parseInt(e.target.value))}
                        ></input>
                      </div>
                    </div>
                    <button className='mt-10' type='button' onClick={() => handleParticipantRemove(index)}>
                      <Trash2 className='text-red-700'></Trash2>
                    </button>
                  </div>
                </div>
              ))}
              {participants.length < 3 && (
                <button
                  type='button'
                  onClick={handleParticipantAdd}
                  className='inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black'
                >
                  Add Participant <PlusCircle className='ml-2' size={16} />
                </button>
              )}
              <button
                type='button'
                onClick={handleSubmit}
                className='inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black'
              >
                Register <ArrowRight className='ml-2' size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
