import React from "react";
import Qualitie from "../qualitie/qualitie";
import Bookmark from "../bookmark/bookmark";
import PropTypes from "prop-types";

const User = (props) => {
    return (
        <>
            <tr key={props._id}>
                <th>{props.name}</th>
                <th>
                    {props.qualities.map((qualitie) => (
                        <Qualitie
                            key={qualitie._id}
                            color={qualitie.color}
                            name={qualitie.name}
                        />
                    ))}
                </th>
                <th>{props.profession.name}</th>
                <th>{props.completedMeetings}</th>
                <th>{props.rate}</th>
                <th>
                    <Bookmark
                        status={props.bookmark}
                        handleChangeBookmarkStatus={() =>
                            props.handleChangeBookmarkStatus(props._id)
                        }
                    />
                </th>
                <th>
                    <button
                        className="btn btn-danger btn-sm m-2"
                        onClick={() => props.deleteUser(props._id)}
                    >
                        Удалить
                    </button>
                </th>
            </tr>
        </>
    );
};

User.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    handleChangeBookmarkStatus: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default User;
