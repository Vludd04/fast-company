import React from "react";
import { useSelector } from "react-redux";
import {
  getProfessionbyId,
  getProfessionsLoadingStatus,
} from "../../store/professions";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const prof = useSelector(getProfessionbyId(id));

  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else return "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
