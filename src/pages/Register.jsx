import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // засега логваме веднага след "регистрация"

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !values.email.trim() ||
      !values.password.trim() ||
      !values.repeatPassword.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (values.password !== values.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    // по-късно ще викаме SoftUni server /users/register
    login({
      email: values.email,
      accessToken: "dummy-token",
    });

    navigate("/catalog");
  }

  return (
    <main>
      <h1 className="page-title">Register</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="repeatPassword">Repeat password</label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            value={values.repeatPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="submit">Register</button>
        </div>
      </form>
    </main>
  );
}

export default Register;
