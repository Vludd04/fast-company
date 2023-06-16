import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import { Link } from "react-router-dom";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUserData());
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  if (!currentUser) return "Loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2 link-light">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="User Image"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/signout" className="dropdown-item">
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
