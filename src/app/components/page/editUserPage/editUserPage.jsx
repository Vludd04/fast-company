import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    useEffect(() => {
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: setUserQualities(qualities),
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const setUserQualities = (qualities) => {
        return qualities.map((quality) => ({
            label: quality.name,
            value: quality._id
        }));
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

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

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;

        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        api.users.update(userId, newData).then((data) => {
            history.push(`/users/${data._id}`);
        });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {qualities.length > 0 ? (
                        <form onSubmit={handleSubmit} className="m-2">
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
                                label="Выберите вашу профессию"
                                name="profession"
                                value={data.profession}
                                defaultOption="Выбрать..."
                                onChange={handleChange}
                                options={professions}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                onChange={handleChange}
                                value={data.sex}
                                name="sex"
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                name="qualities"
                                onChange={handleChange}
                                options={qualities}
                                label="Выберите ваши качества"
                                defaultOption="Выбрать..."
                                defaultValue={data.qualities}
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
