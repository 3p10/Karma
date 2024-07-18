// // context/MyContext.js
// import { createContext, useContext, useState } from 'react';

// const MyContext = createContext();

// export const MyContextProvider = ({ children }) => {
//   const [isLogin, setIsLogin] = useState(0);

//   const updateMyState = (newValue) => {
//     setIsLogin(newValue);
//   };

//   return (
//     <MyContext.Provider value={{ isLogin, setIsLogin }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export const useMyContext = () => {
//   return useContext(MyContext);
// };
// context/MyContext.js
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(0);
  const [tusername, setTUsername] = useState('');
  const [ttitle, setTtitle] = useState('');
  const [createAt, setCreateAt] = useState('');
  const [tstate, setTState] = useState('');
  const [addcomment, setAddcomment] = useState(false);
  const [isAdmin, setIsAdmin] = useState(0);
  const [refreshUnConfirmedPage, setrefreshUnConfirmedPage] = useState(false);
  const [refreshestimate, setrefreshestimate ]=useState(false)
  const [karmaUpdate, setkarmaUpdate ]=useState(false)
  const [homeUpdate, sethomeUpdate ]=useState(false)

  const [currentidea, setcurrentidea] = useState();
  // const updateMyState = (newValue) => {
  //   setIsLogin(newValue);
  // };

  return (
    <MyContext.Provider
      value={{
        karmaUpdate, 
        setkarmaUpdate,
        homeUpdate, 
        sethomeUpdate,

        refreshestimate, 
        setrefreshestimate,

        currentidea, setcurrentidea,


        isAdmin,
        setIsAdmin,

        isLogin,
        setIsLogin,

        tusername,
        setTUsername,

        ttitle,
        setTtitle,

        createAt,
        setCreateAt,

        tstate,
        setTState,

        addcomment, 
        setAddcomment,

        refreshUnConfirmedPage,
        setrefreshUnConfirmedPage
        
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};