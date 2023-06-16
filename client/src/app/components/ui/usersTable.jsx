import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "./profession";

const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
  const columns = {
    name: {
      path: "name",
      name: "Name",
      component: (user) => (
        <Link className="nav-link link-primary" to={`/users/${user._id}`}>
          {user.name}
        </Link>
      ),
    },
    qualities: {
      name: "Qualities",
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: {
      name: "Profession",
      component: (user) => <Profession id={user.profession} />,
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Meets",
    },
    rate: { path: "rate", name: "Rate" },
    bookmark: {
      path: "bookmark",
      name: "Favorites",
      component: (user) => <Bookmark userId={user._id} />,
    },
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array,
  onSort: PropTypes.func,
  selectedSort: PropTypes.shape({
    path: PropTypes.string,
    order: PropTypes.string,
  }),
};

export default UsersTable;
