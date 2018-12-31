import * as t from '../actionTypes';
import { callAPI } from '../../../services/api';
import jwtDecode from 'jwt-decode';
import { getToken } from '../../../services/token';

export function createGoalRequest(payload) {
  return async dispatch => {
    try {
      dispatch({ type: t.CREATE_GOAL_REQUEST });
      let token = getToken();
      let decoded = jwtDecode(token);
      let goal = await callAPI('post', `/goals/${decoded.username}`, true, {
        ...payload,
        _token: token
      });
      // dispatch the success action creator and the jobs that we got back
      dispatch(createGoalSuccess(goal));
    } catch (error) {
      dispatch(createGoalFail(error));
      return Promise.reject();
    }
  };
}

export function createGoalSuccess(goal) {
  return { type: t.CREATE_GOAL_SUCCESS, goal: goal.goal };
}

export function createGoalFail(error) {
  return { type: t.CREATE_GOAL_FAIL, error };
}

export function editGoalRequest(id, payload) {
  return async dispatch => {
    try {
      dispatch({ type: t.EDIT_GOAL_REQUEST });
      let token = getToken();
      let decoded = jwtDecode(token);
      let goal = await callAPI(
        'patch',
        `/goals/${decoded.username}/${id}`,
        true,
        {
          ...payload,
          _token: token
        }
      );
      // dispatch the success action creator and the jobs that we got back
      dispatch(editGoalSuccess(goal));
    } catch (error) {
      dispatch(editGoalFail(error));
      return Promise.reject();
    }
  };
}

export function editGoalSuccess(goal) {
  return { type: t.EDIT_GOAL_SUCCESS, goal: goal.goal };
}

export function editGoalFail(error) {
  return { type: t.EDIT_GOAL_FAIL, error };
}
