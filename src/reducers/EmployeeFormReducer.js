import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      // note: action.payload looks like: { prop: 'name', value: 'foo' }
      // note: he square brackets are key interpolation (key is determined at runtime)
      //   equivalent to:
      //   let newState = { ...state };
      //   newState[action.paylad.prop] = action.payload.value;
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      // once a creation is completed in firebase, reset the form values
      return INITIAL_STATE;
    case EMPLOYEE_DELETE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      // once an update (save) is completed in firebase, reset the form values
      return INITIAL_STATE;
    default:
      return state;
  }
};
