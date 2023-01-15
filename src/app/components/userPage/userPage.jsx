import React, { useState, useEffect } from "react";
import api from "../../api";
import QualitiesList from "../qualitiesList";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const handleBackToUsers = () => {
        history.push("/users");
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    if (user) {
        return (
            <>
                <h2>{user.name}</h2>
                <h4>Профессия: {user.profession.name}</h4>
                <h4>
                    <QualitiesList qualities={user.qualities} />
                </h4>
                <h4>Встретился, раз: {user.completedMeetings}</h4>
                <h4>Рейтинг: {user.rate}</h4>
                <button
                    onClick={() => {
                        handleBackToUsers();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return "loading.. ";
};

UserPage.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object
};

export default UserPage;
