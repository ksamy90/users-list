import React, { useReducer } from "react";

const toggleReducer = (state, action) => {
  if (action.type === "TOGGLE") {
    return { ...state, value: action.current };
  }
};
const userReducer = (state, action) => {
  if (action.type === "USER") {
    return { ...state, value: action.val };
  }
};

export default function UserList(props) {
  const [toggle, dispatchToggle] = useReducer(toggleReducer, { value: false });
  const [user, dispatchUser] = useReducer(userReducer, {
    value: props.user.value,
  });

  const handleRemove = () => {
    props.removeUser(props.id);
  };
  const toggleEdit = () => {
    dispatchToggle({ type: "TOGGLE", current: !toggle.value });
  };
  const handleChange = (e) => {
    dispatchUser({ type: "USER", val: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateUser(props.id, user);
    dispatchToggle({ type: "TOGGLE", current: false });
  };

  let result;
  if (toggle.value) {
    result = (
      <form onSubmit={handleSubmit}>
        <input type="text" value={user.value} onChange={handleChange} />
        <button>save</button>
      </form>
    );
  } else {
    result = (
      <div>
        {props.user.value}
        <button onClick={toggleEdit}>edit</button>{" "}
        <button onClick={handleRemove}>remove</button>
      </div>
    );
  }
  return result;
}
