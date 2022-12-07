import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../pagination/paginaton";
import User from "../user/user";
import style from "./style.module.css";
import PropTypes from "prop-types";
import GroupList from "../groupList/groupList";
import api from "../../api";
import SearchStatus from "../searchStatus/searchStatus";

const Users = ({ users, ...rest }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;

    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className={style.wrapper}>
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table table-hover table-dark">
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Качества</th>
                                <th>Профессия</th>
                                <th>Встретился, раз</th>
                                <th>Оценка</th>
                                <th>Избранное</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    handleChangeBookmarkStatus={() =>
                                        rest.handleChangeBookmarkStatus(
                                            user._id
                                        )
                                    }
                                    deleteUser={() => rest.onDelete(user._id)}
                                    key={user._id}
                                    id={user._id}
                                    name={user.name}
                                    qualities={user.qualities}
                                    profession={user.profession}
                                    completedMeetings={user.completedMeetings}
                                    rate={user.rate}
                                    bookmark={user.bookmark}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
