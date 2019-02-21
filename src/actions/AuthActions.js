// note: these are actually "action creators"
// they are functions that return an action
// the action must be a javascript object with a 'type' property
// with redux-thunk they can optionally return a function 
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  // we are using redux-thunk here because it is an asynchronous call (and we
  //   don't want to dispatch an action until it returns)
  // Therefore, we return a function (instead of an action object)
  //   That function takes a 'dispatch' param which is a function that allows us to manually
  //   dispatch the action once the work is complete (inside the 'then' function or error function)
  // This function is called immediately, but the action is dispatched in the
  // 'then' function after the asynchronous work is complete
  return (dispatch) => {
    // used for the spinner
    // We can dispatch multiple actions in the redux-thunk function that we return here
    // Note also, this will be called immediately
    dispatch({ type: LOGIN_USER_START });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

// we are specifically not exporting here as it is a helper for our other actions
const loginUserSuccess = (dispatch, user) => {
  // note: you can also pass in multiple actions here
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.main();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
