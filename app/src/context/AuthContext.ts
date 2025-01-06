import { createContext } from "react";

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  setIsLogin: () => {},
});

export default AuthContext;
