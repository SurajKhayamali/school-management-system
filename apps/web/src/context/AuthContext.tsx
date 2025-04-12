import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthState } from "../types/auth.types";
import { jwtDecode } from "jwt-decode";

// Define initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
};

// Define action types
type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { user: any; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "AUTH_LOADED" };

// Create context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    case "AUTH_LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        // Verify token is not expired
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token expired
          dispatch({ type: "LOGOUT" });
        } else {
          // Valid token
          const user = JSON.parse(userStr);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, token },
          });
        }
      } catch (err) {
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "AUTH_LOADED" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
export const useAuth = () => useContext(AuthContext);
