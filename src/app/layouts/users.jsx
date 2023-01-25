import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditForm from "../components/page/editUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit === "edit" ? (
                    <UserEditForm />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
