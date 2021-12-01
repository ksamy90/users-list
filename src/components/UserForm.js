import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { ...state, value: action.val, id: action.id };
  }
};

export default function UserForm(props) {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    id: "",
    value: "",
  });

  const changeInput = (evt) => {
    dispatchInput({ type: "INPUT", val: evt.target.value, id: uuid() });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addUser(inputState);
    dispatchInput({ type: "INPUT", val: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputState.value} onChange={changeInput} />
        <button>add user</button>
      </form>
    </div>
  );
}
