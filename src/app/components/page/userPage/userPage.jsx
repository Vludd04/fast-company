import React, { useState, useEffect } from "react";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleBackToUsers = () => {
        history.push("/users");
    };

    const handleEditClick = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <div className="card m-4 w-25">
            <div className="card-header text-center">User Card</div>
            <div className="card-body">
                {user ? (
                    <>
                        <h1 className="card-title">{user.name}</h1>
                        <h2 className="card-subtitle mb-2">
                            Профессия: {user.profession.name}
                        </h2>
                        <Qualities qualities={user.qualities} />
                        <p className="card-text mt-2">
                            Встретился, раз: {user.completedMeetings}
                        </p>
                        <h2>Оценка: {user.rate}</h2>
                        <button
                            className="btn btn-secondary me-2"
                            onClick={handleBackToUsers}
                        >
                            Назад
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleEditClick}
                        >
                            Редактрировать
                        </button>
                    </>
                ) : (
                    "loading..."
                )}
            </div>
        </div>
    );
};

UserPage.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object
};

export default UserPage;
