import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateMatch({ onCreateMatch }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    date: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  }

  function validate(formValues) {
    const newErrors = {};

    if (!formValues.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formValues.date.trim()) {
      newErrors.date = "Date is required";
    }

    if (!formValues.location.trim()) {
      newErrors.location = "Location is required";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onCreateMatch(values);
    navigate("/catalog");
  }

  return (
    <main>
      <h1>Create Match</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
          />
          {errors.date && <p className="error">{errors.date}</p>}
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={handleChange}
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <div className="actions">
          <button type="submit">Create</button>
        </div>
      </form>
    </main>
  );
}

export default CreateMatch;
