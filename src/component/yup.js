import * as yup from "yup";

export const schemaUp = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

export const schemaIn = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
});

export const schemaProfile = yup.object().shape({
  name: yup.string().min(3).max(20),
  email: yup.string().email(),
  password: yup.string(),
  image: yup.string(),
});

export const schemaNewArticle = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().required(),
  body: yup.string().min(3).required(),
});