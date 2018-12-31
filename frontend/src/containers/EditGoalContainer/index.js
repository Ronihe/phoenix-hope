import { connect } from 'react-redux';
import { EditGoalForm } from '../../components/EditGoalForm';
import { authRequest } from '../../store/actions/auth';
import { setError, clearError } from '../../store/actions/error';
import { editGoalRequest } from '../../store/actions/goals';

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error
  };
}
export default connect(
  mapStateToProps,
  { authRequest, setError, clearError, editGoalRequest }
)(EditGoalForm);
