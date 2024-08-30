import React from 'react';
import MainContent from './MainContent';

interface TwoColumnLayoutProps {
  friends: { id: string; name:string,amount: number }[];
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ friends }) => {
    return(
  <div className="two-column-layout h-screen absolute top-0 right-0 bottom-0 left-0 ">
    <MainContent friends={friends} />
  </div>
)};

export default TwoColumnLayout;
