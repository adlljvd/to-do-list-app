import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useIsSignedIn() {
  const { isLogin } = useContext(AuthContext);
  return isLogin;
}
