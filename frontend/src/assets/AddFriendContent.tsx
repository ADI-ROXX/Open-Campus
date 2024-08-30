import React from 'react';
import FriendList from './FriendsList';
import Form from './Form';
import './MainContent.scss';
import AddFriend from './AddFriendForm';
import Navbar from '../components/Navbar';

interface MainContentProps {
  friends: { id:string,name:string,amount: number }[];
}

const AddFriendContent: React.FC<MainContentProps> = ({ friends }) =>{ 

  
  return (
  <div className="main-content h-full ">
    <div className="left-side ">
      <div className='font-calligraphic text-6xl mb-5 text-white pt-7'>My Friends</div>
      <div className='p-4 flex flex-wrap rounded'>

      <FriendList friends={friends} />
      </div>
    </div>
    <div className='flex flex-col w-[70%] h-full'>
        <Navbar/>
    <div className="right-side items-center justify-center ml-[15%] mt-[20%]">

      <AddFriend />
    </div>
    </div>
  </div>
)
};

export default AddFriendContent;
