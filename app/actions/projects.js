// @flow
import storage from 'electron-json-storage';
import { fetchConfig } from './configs.js';

export const RECIEVED_PROJECTS = 'RECIEVED_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

const demoData = [
	{
		id: 100,
		name: '...',
		state: 'stopped',
		configId: 100
	},
	{
		id: 101,
		name: '...',
		state: 'running',
		configId: 101
	}
];

export function fetchProjects() {
	console.log('call fetchProjects');
	return (dispatch: Function, getState: Function) => {
		// console.log('fetchProjects', getState().projects.length);
		if (!getState || getState().projects.length === 0) {
			storage.get('projects',  function(error, data) {
				if (error) throw error;

				data = demoData;

				// console.warn('should FETCH ONCE');
				// for (var i = data.length - 1; i >= 0; i--) {
					fetchConfig()(dispatch);
				// }

				if (data.length) {
					dispatch(recievedProjects(data));
				} else {
					dispatch(recievedProjects(demoData));
				}
			});
		}
	};
}

export function recievedProjects(projects) {
	return {
		type: RECIEVED_PROJECTS,
		payload: projects
	};
}

export function setProjectName(name) {
	return {
		type: SET_PROJECT_NAME,
		payload: name
	};
}
