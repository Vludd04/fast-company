import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ content: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Message can't be empty",
      },
    },
  };

  const validate = useCallback((data) => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  useEffect(() => {
    validate(data);
  }, [data]);

  const clearForm = () => {
    setData({ content: "" });
    setErrors({});
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          label="Message"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button type="submit" disabled={!isValid} className="btn btn-primary">
            Add a comment
          </button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCommentForm;
