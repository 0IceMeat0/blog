import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./signin.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAccount,  clearError } from "../reducer"; 
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "antd";
import { schemaIn } from "../yup";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaIn),
  });
  const { error } = useSelector((state) => state.toolkit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const submitFormIn = async (data) => {
    await dispatch(loginAccount(data));
  };

  return (
    <div className="signin">
      {error && (
        <Alert
          message="Error: email or password is invalid"
          type="error"
          showIcon
        />
      )}
      <h3 className="signin__title">Sign In</h3>
      <form className="signin-form" onSubmit={handleSubmit(submitFormIn)}>
        <label className="signin__descriptioninput">
          Email address
          <input
            className={`signup__input ${errors.email ? "error" : ""}`}
            type="email"
            name="email"
            {...register("email")}
            placeholder="Email address"
            autoFocus
            // Обработчик для очистки ошибки
          />
        </label>
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <label className="signin__descriptioninput">
          Password
          <input
            className={`signup__input ${errors.password ? "error" : ""}`}
            type="password"
            name="password"
            {...register("password")}
            placeholder="Password"
            // Обработчик для очистки ошибки
          />
        </label>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <input className="signin__button" type="submit" />
      </form>
      <div className="signin__description">
        Don't have an account?{" "}
        <Link className="link" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export  {SignIn};
