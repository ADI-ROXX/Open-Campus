import React from 'react';
import AvatarCircle from './AvatarCircle';


interface FriendListProps {
  friends: { id: string; name:string, amount:number }[];
}

const FriendList: React.FC<FriendListProps> = ( {friends} ) => {
  return (
  <div className="flex flex-wrap ml-5 gap-4 items-start h-[2px]">
    {friends && friends.map((friend,index) => (

      <AvatarCircle key={index}  id={friend.id} name={friend.name} amount={friend.amount} />
    ))}


  </div>
);
};

export default FriendList;
