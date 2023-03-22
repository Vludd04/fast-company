import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfession } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const history = useHistory();
    const [data, setData] = useState();
    const { currentUser, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const { professions, isLoading: isProfessionsLoading } = useProfession();

    const { qualities, isLoading: isQualititesLoading } = useQualities();

    function getUserQualitiesById(qualitiesIds) {
        const userQualitites = [];

        for (const qualityId of qualitiesIds) {
            for (const quality of qualities) {
                if (qualityId === quality._id) {
                    userQualitites.push({
                        label: quality.name,
                        value: quality._id
                    });
                }
            }
        }

        return userQualitites;
    }

    const getQualitiesIds = (qualities) => {
        return qualities.map((quality) => quality.value);
    };

    const qualitiesList = qualities.map((quality) => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }));

    const professionsList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();

        if (!isValid) return;

        const { qualities } = data;

        const newData = {
            ...data,
            qualities: getQualitiesIds(qualities)
        };

        await updateUser(newData);
        history.push(`/users/${currentUser._id}`);
    };

    useEffect(() => {
        if (
            !isProfessionsLoading &&
            !isQualititesLoading &&
            currentUser &&
            !data
        ) {
            setData({
                ...currentUser,
                qualities: getUserQualitiesById(currentUser.qualities)
            });
        }
    }, [isProfessionsLoading, isQualititesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
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
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
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
