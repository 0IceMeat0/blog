import React from "react";
import { Link } from "react-router-dom";
import "./signup.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount } from "../reducer";
import { useDispatch } from "react-redux";
import { schemaUp } from "../yup";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUp),
  });
  const dispatch = useDispatch();

  const submitFormUp = async (data) => {
    const newUser = {
      username: data.name,
      email: data.email,
      password: data.password,
    };
    await dispatch(createAccount(newUser));
    window.location.href = "/";
  };

  return (
    <div className="signup">
      <h3 className="signup__title">Create a new account</h3>

      <form className="signup__form" onSubmit={handleSubmit(submitFormUp)}>
        <label className="signup__descriptioninput">
          Username
          <input
            className={`signup__input ${errors.name ? "error" : ""}`}
            type="text"
            placeholder="Username"
            name="name"
            {...register("name")}
            autoFocus
          />
        </label>
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <label className="signup__descriptioninput">
          Email address
          <input
            className={`signup__input ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="Email address"
            name="email"
            {...register("email")}
          />
        </label>
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <label className="signup__descriptioninput">
          Password
          <input
            className={`signup__input ${errors.password ? "error" : ""}`}
            type="password"
            placeholder="Password"
            name="password"
            {...register("password")}
          />
        </label>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <label className="signup__descriptioninput">
          Repeat Password
          <input
            className={`signup__input ${errors.confirmPassword ? "error" : ""}`}
            type="password"
            placeholder="Password"
            name="confirmPassword"
            {...register("confirmPassword")}
          />
        </label>
        {errors.confirmPassword && (
          <p className="error-message">Password must match</p>
        )}

        <div className="signup__checkbox">
          <input
            className="checkbox"
            name="acceptCheckbox"
            type="checkbox"
            required
          />
          I agree to the processing of my personal information
        </div>

        <input className="signup__button" type="submit" />
      </form>
      <div className="signup__description">
        Already have an account?{" "}
        <Link className="link" to="/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export  {SignUp};
