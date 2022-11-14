import React, { useState } from "react";
import api from "../api";
import style from "./styles.module.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    if (lastOne === 1) return "человек тусанет";
    return "человек тусанет";
  };

  return (
    <div className={style.wrapper}>
      <div
        className={`badge mb-2 p-2 ${
          users.length > 0 ? "bg-primary" : "bg-danger"
        }`}
      >
        <h5>
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
            : "С тобой никто не тусанет"}
        </h5>
      </div>
      {users.length > 0 && (
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((mark) => (
                      <span
                        className={`badge m-1 bg-${mark.color}`}
                        key={mark._id}
                      >
                        {mark.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
