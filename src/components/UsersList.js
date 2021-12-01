import React, { useReducer } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";

const listReducer = (state, action) => {
  if (action.type === "USER_LIST") {
    return [...state, action.val];
  }
  if (action.type === "REMOVE_USER") {
    return state.filter((state) => state.id !== action.id);
  }
  if (action.type === "UPDATE_USER") {
    return state.map((user) => {
      if (user.id === action.id) {
        return {
          ...user,
          ...action.updates,
        };
      } else {
        return user;
      }
    });
  }
};

export default function UsersList() {
  const [listState, dispatchList] = useReducer(listReducer, []);

  const changeList = (val) => {
    dispatchList({ type: "USER_LIST", val });
  };
  const removeList = (id) => {
    dispatchList({ type: "REMOVE_USER", id });
  };
  const updateList = (id, updates) => {
    dispatchList({ type: "UPDATE_USER", id, updates });
  };

  return (
    <div>
      {listState &&
        listState.map((user) => {
          return (
            <UserList
              key={user.id}
              id={user.id}
              user={user}
              removeUser={removeList}
              updateUser={updateList}
            />
          );
        })}
      <UserForm addUser={changeList} />
    </div>
  );
}
