import { ADD_USER, ADD_PHOTO } from "../actions";
import { combineReducers } from "redux";

const initialState = {};

function users(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
}

function photos(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PHOTO: {
      return { ...state, payload };
    }
    default:
      return state;
  }
}

export default combineReducers({ users, photos });
