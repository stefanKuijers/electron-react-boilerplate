
import { RECIEVED_PROJECTS, SET_PROJECT_NAME } from '../actions/projects';
import { RECIEVED_CONFIG } from '../actions/config';

export default function projects(
	state: Object = [], 
	action: Object
) {
	switch (action.type) {
		case RECIEVED_PROJECTS:
			return [...action.payload];
			break;

		case RECIEVED_CONFIG:
			const project = state.filter(project => project.id === action.payload.projectId)[0];
			const index = state.indexOf(project);
			const updatedProject = Object.assign({}, project, {name: action.payload.name});

			return state
				.slice(0, index)
				.concat(updatedProject)
				.concat(state.slice(index + 1));
			break;
	}

	return state;
}