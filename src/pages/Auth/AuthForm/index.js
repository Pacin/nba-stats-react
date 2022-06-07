import React, { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "../../../config/firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../store/user/userSlice";
import classes from "./Auth.module.scss";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("register")) {
      setIsRegister(true);
    }

    if (location.pathname.includes("login")) {
      setIsRegister(false);
    }
  }, [location]);

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((err) => {
        alert(err);
      });
  };

  const toRegister = () => {
    setIsRegister(true);
    history.replace("/register");
  };

  const toLogin = () => {
    setIsRegister(false);
    history.replace("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        })
          .then(() => {
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
              })
            );
          })
          .catch((error) => {
            console.log("user not updated");
          });
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className={classes.auth}>
      <form onSubmit={!isRegister ? loginToApp : handleRegister}>
        {isRegister && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">{!isRegister ? "Sign In" : "Register"}</button>
      </form>

      {!isRegister && (
        <p>
          Not a member?{" "}
          <span className={classes["auth__register"]} onClick={toRegister}>
            Register Now
          </span>
        </p>
      )}
      {isRegister && (
        <p>
          Have an account?{" "}
          <span className={classes["auth__register"]} onClick={toLogin}>
            Login
          </span>
        </p>
      )}
    </div>
  );
};

export default Login;
