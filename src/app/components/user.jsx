import React, { useState, useEffect } from "react";
import api from "../api";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";

const User = ({ match, history }) => {
    const [user, setUser] = useState();
    const userId = match.params.userId;
    const BackToUsers = () => {
        history.push("/users");
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <>
                <h2>{user.name}</h2>
                <h4>Профессия: {user.profession.name}</h4>
                <h4>
                    <QualitiesList qualities={user.qualities} />
                </h4>
                <h4>Встретился раз: {user.completedMeetings}</h4>
                <h4>Рейтинг: {user.rate}</h4>

                <button
                    onClick={() => {
                        BackToUsers();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return "loading...";
};

User.propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object,
    history: PropTypes.object
};

export default User;
