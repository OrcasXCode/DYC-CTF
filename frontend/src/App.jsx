import React, { useState } from 'react';
import { ArrowRight, Trash2, PlusCircle } from 'lucide-react';
import dyc from './assets/dyc.png';
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

 const handleSubmit = () => {
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

  axios
    .post('http://localhost:3000/user/register', dataToSend)
    .then((response) => {
      console.log('Registration successful:', response.data);
      alert("Registration done")
    })
    .catch((error) => {
      console.error('Error occurred while registering:', error);
      alert("Registration Error")
    });
};


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
