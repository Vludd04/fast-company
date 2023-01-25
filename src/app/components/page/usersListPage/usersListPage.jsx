import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/paginaton";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    const [users, setUsers] = useState();

    const [search, setSearch] = useState("");

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);

    const handleProfessionSelect = (item) => {
        if (search !== "") setSearch("");
        setSelectedProf(item);
    };

    const handleSearch = ({ target }) => {
        setSelectedProf(null);
        setSearch(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        let filteredUsers = users;

        if (selectedProf) {
            filteredUsers = users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            );
        } else if (search) {
            filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
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
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
