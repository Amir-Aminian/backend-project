import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userEmail, setUserEmail] = useState(undefined);

    const [SQ, setSQ] = useState(undefined);

    const [SA, setSA] = useState(false);

    return (
        <UserContext.Provider value={{SQ, setSQ, SA, setSA, userEmail, setUserEmail}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
