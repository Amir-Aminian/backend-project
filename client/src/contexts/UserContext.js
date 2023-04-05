import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [SQ, setSQ] = useState(undefined);

    const [SA, setSA] = useState(false);

    return (
        <UserContext.Provider value={{SQ, setSQ, SA, setSA}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
