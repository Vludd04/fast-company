import React, { useState } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../pagination/paginaton";
import User from "../user/user";
import style from "./style.module.css";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <div className={style.wrapper}>
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
                                    rest.handleChangeBookmarkStatus(user._id)
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
