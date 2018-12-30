import { connect } from 'react-redux';
import { CollectionsPage } from '../../components/GoalForm';
import { authRequest } from '../../store/actions/auth';
import { setError, clearError } from '../../store/actions/error';

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error
  };
}
export default connect(
  mapStateToProps,
  { authRequest, setError, clearError }
)(CollectionsPage);
