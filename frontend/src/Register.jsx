import React, {  useState } from 'react';
import { ArrowRight, Trash2, PlusCircle} from 'lucide-react';
import grid from './assets/grid.png';
import qr from './assets/qr.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function Register(props) {

    const [teamName, setTeamName] = useState('');
    const [teamLeaderName, setTeamLeaderName] = useState('');
    const [teamLeaderEmail, setTeamLeaderEmail] = useState('');
    const [teamLeaderId, setTeamLeaderId] = useState('');
    const [teamLeaderContactNo, setTeamLeaderContactNo] = useState('');
    const [transId, settransId] = useState('');
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
    const loadingToast = toast.loading("Verifying Credentials...");
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
        toast.success("Credentials Verified");
        }
        else{
        toast.error(responseData.msg);
        }
    } catch (error) {
        console.error("Error occurred while processing registration:", error);
        toast.error("Error while registration");
    }
    finally {
        toast.dismiss(loadingToast);
        }
    };

    const handlePayment = async () => {
    const loadingToast = toast.loading("Proccessing Payment...");
    if (
        !transId ||
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
        toast.error("Please fill in all required fields.");
        return;
    }

 
    const membersArray = participants.map((participant) => ({
        name: participant.name,
        email: participant.email,
        id: participant.id,
        phoneNumber: participant.contactNo,
    }));

    const dataToSend = {
        transId:transId,
        teamName: teamName,
        teamLeaderName: teamLeaderName,
        teamLeaderEmail: teamLeaderEmail,
        teamLeaderNo: teamLeaderContactNo,
        teamLeaderId: teamLeaderId,
        members: membersArray,
    };

    try {
        const response = await axios.post(
        "http://localhost:3000/user/verify-payment",
        dataToSend
        );
        if(response){
        toast.success("Registered Successfully");
        window.location.href = "/success-page";
        }
        else{
        toast.error("Registration  Failed");
        }
    } catch (error) {
        toast.error("Error while registration");
    }
    finally {
        toast.dismiss(loadingToast);
        }
    };

    

    return (
      <>
      <div className='bg-black text-white' style={{ backgroundImage: `url(${grid})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Toaster></Toaster>
        <div id="wrap" className='flex items-center justify-center'>
            <div id="glitch" className='text-2xl pt-10 lg:text-[50px]' data-text="GLITCH" style={{fontFamily:'oswald',}}>GUIDLINES FOR registering</div> 
        </div>
      <div className='max-w-7xl mx-auto mt-[70px] items-center justify-center lg:px-[70px]' style={{ fontFamily: 'oswald'}}>
        <ul className="list-disc list-inside lg:gap-10]">
            <li style={{ marginBottom: '10px' }}>Our team is not responsible for any future inconvenience caused by submitting wrong details.</li>
            <li style={{ marginBottom: '10px' }}>Any indiscipline action or inappropriate behaviour may lead to consequences.</li>
            <li style={{ marginBottom: '10px' }}>Provide accurate team leader name, registration ID, email address, and contact number.</li>
            <li style={{ marginBottom: '10px' }}>If adding more than one participant, click "Add Participant" for each additional member.</li>
            <li style={{ marginBottom: '10px' }}>Enter each participant's name, registration ID, email address, and contact number.</li>
            <li style={{ marginBottom: '10px' }}>Ensure all participants' details are entered correctly.</li>
            <li style={{ marginBottom: '10px' }}>Click "Register Now" to complete the registration process and further proceed towards to payment process.</li>
            <li>During the payment process please make sure you provide valid Transaction ID to avoid any further inconvenience.</li>
        </ul>
        </div>
      </div>
      <div  style={{fontFamily:'oswald', backgroundImage: `url(${grid})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='text-white bg-black flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-30'>
        <div className='h-full w-full mx-auto'>
          <form action='#' method='POST' className='mt-8  w-full flex items-center justify-center'>
            <div className='space-y-10'>
              <div>
                <label htmlFor='' className='text-base font-medium'>
                  Team Name
                  </label>
                <div className='mt-2'>
                   <input
                    className="flex border-gray-300 h-10  rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600  focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                <div className='' key={index}>
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
                    id="name"
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
                    htmlFor="contactNo"
                  >
                   {index + 1 == 0 ? `Team Contact No` : `Participant ${(index + 1)} Contact No`}
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border-gray-300 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Contact No"
                    id="contactNo"
                     onChange={(e) => handleParticipantChange(index, 'contactNo', e.target.value)}
                  ></input>
                </div>
                {/* <div className='w-full mt-[20px]  flex items-center justify-center h-10'> */}
                  <button className='w-full h-full flex items-end justify-center mt-10' type='button' onClick={() => handleParticipantRemove(index)}>
                    <Trash2 className='text-red-700'></Trash2>
                  </button>
                {/* </div> */}
              </div>
                </div>
              ))}

              {participants.length < 3 && (
                  <button type='button' onClick={handleParticipantAdd} class="btn one" >Add Participant <PlusCircle className='ml-2' size={16}/></button>
              )}
              <button type='button'  onClick={handleSubmit}  class="btn two">Register Now <ArrowRight className='ml-2' size={16} /></button>
              {payNow && <div className=' flex justify-center'><img src={qr} className='w-[300px] h-[300px]'></img></div>}
              {payNow && <div> <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="transId"
                  >
                   UPI Transaction ID
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border-gray-300 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="UPI Transaction ID"
                    id="transId"
                     onChange={(e) => settransId(e.target.value)}
              ></input></div>}
              {payNow && <button type='button' onClick={handlePayment} class="btn three">Proceed Payment  <ArrowRight className='ml-2' size={16} /></button>}
            </div>
          </form>
        </div>
      </div>
      </>
    )
}
