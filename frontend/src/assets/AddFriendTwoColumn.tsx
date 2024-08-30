import React from 'react';
import MainContent from './MainContent';
import AddFriendContent from './AddFriendContent';

interface TwoColumnLayoutProps {
  friends: { id: string; name:string,amount: number }[];
}

const AddFriendTwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ friends }) => {
    return(
  <div className="two-column-layout h-screen absolute top-0 right-0 bottom-0 left-0 ">
    <AddFriendContent friends={friends} />
  </div>
)};

export default AddFriendTwoColumnLayout;
