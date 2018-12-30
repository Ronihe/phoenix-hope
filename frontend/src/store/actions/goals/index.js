import * as t from '../actionTypes';
import { callAPI } from '../../../services/api';

export function fetchGoalsRequest() {
  return async dispatch => {
    try {
      // tell everyone we're making the request
      dispatch({ type: t.FETCH_GOALS_REQUEST });
      // call the API for /jobs, auth required
      let jobs = await callAPI('get', '/goals', true);
      // dispatch the success action creator and the jobs that we got back
      dispatch(fetchJobsSuccess(jobs));
    } catch (error) {
      dispatch(fetchJobsFail(error));
      return Promise.reject();
    }
  };
}

export function fetchJobsSuccess(jobs) {
  return { type: t.FETCH_JOBS_SUCCESS, jobs };
}

export function fetchJobsFail(error) {
  return { type: t.FETCH_JOBS_FAIL, error };
}
