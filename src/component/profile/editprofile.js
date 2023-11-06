import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editAccount } from "../reducer";
import "./editprofile.scss";
import { useSelector, useDispatch } from "react-redux";
import { schemaProfile } from "../yup";


function EditProfile() {
  const { user } = useSelector((state) => state.toolkit);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaProfile),
  });

  const submitFormUp = async (data) => {
    const newUserData = {
      username: data.name,
      email: data.email,
    };

    if (data.password) {
      newUserData.password = data.password;
    }
    if (data.image) {
      newUserData.image = data.image;
    }
    console.log(newUserData);
    await dispatch(editAccount(newUserData));
    window.location.href = "/";
  };

  return (
    <div className="profile">
      <h3 className="profile__title">Edit profile</h3>

      <form className="profile__form" onSubmit={handleSubmit(submitFormUp)}>
        <label className="profile__descriptioninput">
          Username
          <input
            className={`profile__input ${errors.name ? "error" : ""}`}
            type="text"
            placeholder="Username"
            name="name"
            defaultValue={user.username}
            {...register("name")}
            autoFocus
          />
        </label>
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <label className="profile__descriptioninput">
          Email address
          <input
            className={`profile__input ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="Email address"
            name="email"
            defaultValue={user.email}
            {...register("email")}
          />
        </label>
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <label className="profile__descriptioninput">
          New Password
          <input
            className={`profile__input ${errors.password ? "error" : ""}`}
            type="password"
            placeholder="New Password"
            name="password"
            {...register("password")}
          />
        </label>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <label className="profile__descriptioninput">
          Avatar image (url)
          <input
            className={`profile__input ${errors.image ? "error" : ""}`}
            type="text"
            placeholder="Avatar image"
            name="image"
            defaultValue={user.image}
            {...register("image")}
          />
        </label>
        {errors.confirmPassword && (
          <p className="error-message">Password must match</p>
        )}

        <input className="profile__button" type="submit" value="Save" />
      </form>
    </div>
  );
}
export default EditProfile;
