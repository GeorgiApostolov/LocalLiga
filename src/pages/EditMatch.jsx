import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function EditMatch({ matches, onEditMatch }) {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const existingMatch = matches.find((m) => m._id === matchId);

  const [values, setValues] = useState(() => {
    if (!existingMatch) {
      return {
        title: "",
        date: "",
        location: "",
      };
    }

    return {
      title: existingMatch.title,
      date: existingMatch.date,
      location: existingMatch.location,
    };
  });

  const [errors, setErrors] = useState({});

  const { user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated && existingMatch._ownerId === user._id;

  if (!isOwner) {
    return (
      <main>
        <h2>Not authorized.</h2>
      </main>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
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

    onEditMatch(Number(matchId), values);
    navigate(`/matches/${matchId}`);
  }

  if (!existingMatch) {
    return (
      <main>
        <h2>Match not found.</h2>
      </main>
    );
  }

  return (
    <main>
      <h1>Edit Match</h1>

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
          <button type="submit">Save changes</button>
        </div>
      </form>
    </main>
  );
}

export default EditMatch;
