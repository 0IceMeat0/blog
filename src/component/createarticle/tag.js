import React from "react";
import { useDispatch } from "react-redux";

import { addTag, deleteTag, editTag } from "../reducer";

function Tag({ id, idx, tagsLength, value }) {
  const lastOne = idx === tagsLength - 1;
  const vals = value.length > 0 ? "" : "disabled";

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTag(id));
  };

  const onAdd = () => {
    dispatch(addTag());
  };
  const onLabelChange = (val) => {
    if (val !== undefined) {
      dispatch(
        editTag({
          id,
          label: val.trim(),
        }),
      );
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Tag"
        className="signin__input"
        defaultValue={value}
        onChange={(e) => onLabelChange(e.target.value)}
      />
      {tagsLength > 1 && (
        <button type="button" className="button-delete" onClick={onDelete}>
          Delete
        </button>
      )}
      {lastOne && (
        <button
          type="button"
          className="button-add"
          onClick={onAdd}
          disabled={vals}
        >
          Add Tag
        </button>
      )}
    </>
  );
}

export default Tag;
