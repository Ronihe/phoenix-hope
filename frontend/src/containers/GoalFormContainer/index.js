import { connect } from 'react-redux';
import { GoalForm } from '../../components/GoalForm';
import { authRequest } from '../../store/actions/auth';
import { setError, clearError } from '../../store/actions/error';
import { createGoalRequest } from '../../store/actions/goals';

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error
  };
}
export default connect(
  mapStateToProps,
  { authRequest, setError, clearError, createGoalRequest }
)(GoalForm);
