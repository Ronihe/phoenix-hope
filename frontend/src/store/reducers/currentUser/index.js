import * as t from '../../actions/actionTypes';

const DEFAULT_STATE = {
  username: '',
  first_name: '',
  last_name: '',
  goals: []
};

export default function currentUser(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case t.FETCH_CURRENT_USER_SUCCESS:
      return { ...action.user };
    case t.LOGOUT:
      return DEFAULT_STATE;
    case t.CREATE_USER_SUCCESS:
      return { ...state, ...action.newUser };
    case t.UPDATE_CURRENT_USER_SUCCESS:
      return { ...state, ...action.user, password: '' };
    case t.CREATE_GOAL_SUCCESS:
      return { ...state, goals: [...state.goals, action.goal] };
    default:
      return state;
  }
}
