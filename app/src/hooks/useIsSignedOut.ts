import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useIsSignedOut() {
  const { isLogin } = useContext(AuthContext);
  return !isLogin;
}
