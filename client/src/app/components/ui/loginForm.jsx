import React, { useCallback, useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signIn } from "../../store/users";

const LoginForm = () => {
  const dispath = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email is required",
      },
    },
    password: {
      isRequired: {
        message: "Password is required",
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

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/users";

    dispath(signIn({ payload: data, redirect }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Remember me
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto mb-2"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
