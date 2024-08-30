// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [provider, setProvider] = useState('');
    const [contract, setContract] = useState('');
    const [account, setAccount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount_, setAmount_] = useState('');
    const [ipfs, setIpfs] = useState('');
    const dispatcher=(foo,val)=>{foo(val);};
    const [selectedIds, setSelectedIds] = useState([]);
  return (
    <AuthContext.Provider value={{ provider,contract,setProvider,setContract,account,setAccount,receiver,setReceiver,amount_, setAmount_,ipfs,setIpfs,dispatcher,selectedIds,setSelectedIds }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
