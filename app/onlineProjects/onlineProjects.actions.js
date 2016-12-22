// @flow
import axios from 'axios';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

import OnlineProjectServer from './OnlineProjectServer';

export const REFRESH_ONLINE_PROJECTS = 'REFRESH_ONLINE_PROJECTS';
export const RECIEVED_ONLINE_PROJECTS = 'RECIEVED_ONLINE_PROJECTS';
export const REGISTER_ONLINE_PROJECT = 'REGISTER_ONLINE_PROJECT';
export const REGISTERED_ONLINE_PROJECT = 'REGISTERED_ONLINE_PROJECT';
export const UNREGISTER_ONLINE_PROJECTS = 'UNREGISTER_ONLINE_PROJECTS';
export const UNREGISTERED_ONLINE_PROJECTS = 'UNREGISTERED_ONLINE_PROJECTS';


export function getOnlineProjects() {
	return (dispatch: Function, getState: Function) => {
		dispatch({ type: REFRESH_ONLINE_PROJECTS });
		
		axios.get('/users', {
		    params: {
		    	c: 'getOnlineProjects'
		    }
		}).then((response) => {
			dispatch(recievedOnlineProjects(response.data));
		});
	};
}

export function recievedOnlineProjects(projects) {
	return {
		type: RECIEVED_ONLINE_PROJECTS,
		payload: projects
	};
}

export function registerOnlineProject(project, url) {
	return (dispatch: Function, getState: Function) => {
		dispatch({ type: REGISTER_ONLINE_PROJECT });

		const state = getState();
		axios.post('/users', {
		    params: {
		    	c: 'registerOnlineProject',
		    	id: project.id,
		    	name: state.configs[project.configId].name,
		    	url,
		    	username: state.profile.username
		    }
		}).then((response) => {
			dispatch(registeredOnlineProject());
		});
	};
}

export function registeredOnlineProject() {
	return {
		type: REGISTERED_ONLINE_PROJECT
	};
}

export function unregisterOnlineProjects(ids = []) {
	return (dispatch: Function) => {
		dispatch({ type: UNREGISTER_ONLINE_PROJECTS });

		axios.post('/users', {
		    params: {
		    	c: 'unregisterOnlineProjects',
		    	ids
		    }
		}).then((response) => {
			dispatch(unregisteredOnlineProjects());
		});
	};
}

export function unregisteredOnlineProjects() {
	return {
		type: UNREGISTERED_ONLINE_PROJECTS
	};
}


export function visitOnlineProject() {
	return (dispatch: Function) => {
		var options = {
            open: 'external',
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            }
        };

        if (config.server.type === 'express') {
            options.server = config.server.target;
        } else {
            options.proxy = config.server.target;
        }

        config.broswerSyncInstance = plugin.browserSync.create(serverName);
        config.broswerSyncInstance.init(options, callback);
	}
}