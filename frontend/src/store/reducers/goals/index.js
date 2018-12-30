import * as t from '../../actions/actionTypes';

const DEFAULT_STATE = {
  goals: []
};

export default function goals(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case t.FETCH_GOALS_SUCCESS:
      return {
        ...state,
        goals: [...action.goals]
      };
    case t.LOGOUT:
      return DEFAULT_STATE;
    case t.CREATE_USER_SUCCESS:
      return { ...state, ...action.newUser };
    case t.UPDATE_CURRENT_USER_SUCCESS:
      return { ...state, ...action.user, password: '' };
    default:
      return state;
  }
}
