// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OnlineProjects from './OnlineProjects';
import * as OnlineProjectsActions from './onlineProjects.actions';


function mapStateToProps(state) {
  return {
  	onlineProjects: state.onlineProjects,
  	projects: state.projects,
  	profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
		{ 
			...OnlineProjectsActions
		}, 
		dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineProjects);
