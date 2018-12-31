import { connect } from 'react-redux';
import DeleteGoalButton from '../../components/DeleteGoalButton';
import { authRequest } from '../../store/actions/auth';
import { setError, clearError } from '../../store/actions/error';
import { deleteGoalRequest } from '../../store/actions/goals';

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error,
    currentUser: reduxState.currentUser
  };
}
export default connect(
  mapStateToProps,
  { authRequest, setError, clearError, deleteGoalRequest }
)(DeleteGoalButton);
