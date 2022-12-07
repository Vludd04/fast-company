import React, { useEffect, useState } from "react";
import api from "../api";
import Users from "./users/users";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleChangeBookmarkStatus = (id) => {
        const newStatus = users.map((user) => {
            return user._id === id
                ? { ...user, bookmark: !user.bookmark }
                : user;
        });
        setUsers(newStatus);
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    return (
        <>
            {users ? (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    handleChangeBookmarkStatus={handleChangeBookmarkStatus}
                />
            ) : (
                " loading..."
            )}
        </>
    );
}

export default App;
