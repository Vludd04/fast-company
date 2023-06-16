import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData, updateUser } from "../../../store/users";
import { getProfessions } from "../../../store/professions";
import {
  getQualities,
  getQualitiesLoadingStatus,
} from "../../../store/qualities";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const currentUser = useSelector(getCurrentUserData());
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
  const isQualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const isProfessionsLoading = useSelector(getQualitiesLoadingStatus());

  function getUserQualitiesById(qualitiesIds) {
    const userQualitites = [];
    for (const qualityId of qualitiesIds) {
      for (const quality of qualities) {
        if (qualityId === quality._id) {
          userQualitites.push({
            label: quality.name,
            value: quality._id,
          });
        }
      }
    }
    return userQualitites;
  }

  const getQualitiesIds = (qualities) => {
    return qualities.map((quality) => quality.value);
  };

  const qualitiesList = qualities
    ? qualities.map((quality) => ({
        label: quality.name,
        value: quality._id,
        color: quality.color,
      }))
    : "Loading...";

  const professionsList = professions
    ? professions.map((profession) => ({
        label: profession.name,
        value: profession._id,
      }))
    : "Loading...";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { qualities } = data;
    const newData = {
      ...data,
      qualities: getQualitiesIds(qualities),
    };
    dispatch(updateUser(newData));
  };

  useEffect(() => {
    if (!isProfessionsLoading && !isQualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: getUserQualitiesById(currentUser.qualities),
      });
    }
  }, [isProfessionsLoading, isQualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

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
        message: "Enter your name",
      },
    },
  };

  useEffect(() => {
    validate(data);
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validate = useCallback((data) => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Choose your profession"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
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
                defaultValue={data.qualities}
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Choose your qualities"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Update
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
