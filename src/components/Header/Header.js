import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, selectUser } from "../../store/user/userSlice";
import { auth } from "../../config/firebase";

import classes from "./Header.module.scss";

const Header = (props) => {
  const dispatch = useDispatch();

  const logoutApp = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase
    auth.signOut();
  };

  const user = useSelector(selectUser);

  return (
    <header className={classes.header}>
      <NavLink to="/" className={classes.brand}>
        All About NBA
      </NavLink>
      <nav className={classes["nav-list"]}>
        <ul className="d-flex">
          {user && (
            <li>
              <NavLink
                to="/players"
                className={classes["nav-link"]}
                activeClassName={classes.active}
              >
                Players
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to="/profile"
                className={classes["nav-link"]}
                activeClassName={classes.active}
              >
                Profile
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink
                to="/login"
                className={classes["nav-link"]}
                activeClassName={classes.active}
              >
                Login
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to="/login"
                className={classes["nav-link"]}
                activeClassName={classes.active}
                onClick={logoutApp}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
