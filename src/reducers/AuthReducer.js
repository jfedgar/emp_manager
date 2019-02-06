import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type);
  console.log(state);
  switch (action.type) {
    case EMAIL_CHANGED:
      // ...state takes all props and values from state and appends them to this new object
      // it is critical to return a _new_ object and not mutate existing state in redux
      // note: later key/values will overwrite the earlier ones, so if you were
      //   to put '...state' at the end it would overwrite 'email' with the last state it was in
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
