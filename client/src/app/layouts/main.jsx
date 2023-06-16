import React from "react";

const Main = () => {
  return (
    <div className="container mt-5">
      <h1> Main Page</h1>
      <h3>Data initialization in FireBase</h3>
      <ul>
        <li>Status: Not Started</li>
        <li>Progress: 0%</li>
      </ul>
      <button className="btn btn-danger" type="submit">
        {" "}
        Project moved to MongoDB
      </button>
    </div>
  );
};

export default Main;
