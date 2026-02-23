import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => sessionStorage.getItem('jotish_user'));

  const login = (username) => {
    sessionStorage.setItem('jotish_user', username);
    setUser(username);
  };

  const logout = () => {
    sessionStorage.removeItem('jotish_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}