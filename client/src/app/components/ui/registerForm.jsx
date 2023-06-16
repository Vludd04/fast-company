import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    name: "",
    qualities: [],
    bookmark: false,
    licence: false,
  });
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());

  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));

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
      isEmail: {
        message: "Email entered incorrectly",
      },
    },
    name: {
      isRequired: {
        message: "Name is required",
      },
      min: {
        message: "Name must be at least 3 characters long",
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: "Password is required",
      },
      isCapitalSymbol: {
        message: "Password must contain at least one capital letter",
      },
      isContainDigit: {
        message: "Password must contain at least one number",
      },
      min: {
        message: "Password must be at least 8 characters long",
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: "Profession is required",
      },
    },
    licence: {
      isRequired: {
        message:
          "You may not use our service without confirming the license agreement",
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
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    dispatch(signUp(newData));
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
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Choose your profession"
        defaultOption="Choose..."
        name="profession"
        options={professionsList}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Choose your gender"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Choose your qualities"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        <a>Confirm license agreement</a>
      </CheckBoxField>
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

export default RegisterForm;
