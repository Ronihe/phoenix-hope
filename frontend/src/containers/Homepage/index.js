import { connect } from 'react-redux';
import Homepage from '../../components/Homepage';
import { fetchCurrentUser } from '../../store/actions/users';
import { logout } from '../../store/actions/auth';

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentUser, logout }
)(Homepage);
