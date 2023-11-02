import React, {useEffect} from "react";
import './createarticle.scss';
import Tag from "./tag";
import { useDispatch, useSelector } from "react-redux";
import { createArticle, createTags, schemaNewArticle, updateArticle } from "../reducer";
import { v4 as uuidv4 } from 'uuid'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

function CreateArticle({item = "", editMode}){
  const { tags } = useSelector(state => state.toolkit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaNewArticle),
  });

  const tagz = tags.map((tag, idx) => (
    <li key={tag.id} >
      <Tag idx={idx} id={tag.id} value={tag.label} tagsLength={tags.length} />
    </li>
  ));

  const submitFormNewArticle =  async (data) => {
    const tagz = tags.map(item => item.label.trim()).filter(tag => tag);
     const newArticle = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagz,
  };
if(editMode){
  dispatch(updateArticle({ newArticle, slug: item.slug, navigate }));
} else {
  dispatch(createArticle({newArticle, navigate}))
}
  };

  
  useEffect(() => {
    if (  item && Object.keys(item).length > 0) {
      const newTags = []
      item.tagList.forEach((tag) => {
        newTags.push({
          id: uuidv4(),
          label: tag,
        })
      })
      dispatch(createTags(newTags))
    } else {
      dispatch(createTags([{ id: uuidv4(), label: '' }]))
    }
  }, [dispatch, item]);





return(
<div className="newarticle">
  <h3 className="newarticle__title">Create new article</h3>
 
  <form onSubmit={handleSubmit(submitFormNewArticle)}>
    <label className="newarticle__descriptioninput">Title
      <input className={`newarticle__input ${errors.title ? 'error' : ''}`} type="text" name="title"
      placeholder="Title"
      {...register("title")}
      defaultValue={item.title}
      autoFocus /></label>
      {errors.title && <p className="error-message">{errors.title.message}</p>}

    <label className="newarticle__descriptioninput">Short description
      <input className={`newarticle__input ${errors.description ? 'error' : ''}`} type="text" name="description"
      placeholder="Title"
      {...register("description")}
      defaultValue={item.description}
       /></label>
       {errors.description && <p className="error-message">{errors.description.message}</p>}

    <label className="newarticle__descriptioninput">Text
      <textarea className={`newarticle__textarea ${errors.body ? 'error' : ''}`} type="text" name="body"
      placeholder="Text"
      description="true"
      {...register("body")}
      defaultValue={item.body}
       /></label>
       {errors.body && <p className="error-message">{errors.body.message}</p>}
   <ul>{tagz}</ul>
    <input type="submit" className="newarticle__button"  />
  </form>
  
</div>
);
}
export default CreateArticle;