import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesLoadingStatus,
  getQulitiesByIds,
  loadQualitiesList,
} from "../../../store/qualities";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQulitiesByIds(qualities));
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (isLoading) return "Loading...";

  return (
    <>
      {qualitiesList.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
