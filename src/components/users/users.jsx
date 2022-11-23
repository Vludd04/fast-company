import React from "react";
import User from "../user/user";
import style from "./style.module.css";

const Users = ({ users, ...rest }) => {
  return (
    <div className={style.wrapper}>
      {users.length > 0 && (
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
            {users.map((user) => (
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
    </div>
  );
};
export default Users;
