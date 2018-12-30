import { connect } from 'react-redux';
import Homepage from '../../components/Homepage';
import { fetchCurrentUser } from '../../store/actions/users';

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentUser }
)(Homepage);
