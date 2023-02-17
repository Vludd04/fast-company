import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();

    if (isLoading) {
        return isLoading;
    }

    return (
        <>
            {qualities.map((id) => (
                <Qualitie {...getQuality(id)} key={id} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
