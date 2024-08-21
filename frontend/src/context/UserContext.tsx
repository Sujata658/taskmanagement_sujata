import { User } from "@/types/User"
import React, { useContext, useState } from "react"
import { createContext } from "react"

interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };

export const useUser = () => useContext(UserContext);

export { UserProvider}

