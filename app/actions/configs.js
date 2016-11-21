// @flow
import storage from 'electron-json-storage';

export const RECIEVED_CONFIGS = 'RECIEVED_CONFIGS';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_ROOT_PROPERTY = 'SET_ROOT_PROPERTY';
export const SET_GLOB = 'SET_GLOB';

const demoData = {
	currentConfigId: 100,
	'100': {
		id: 100,
		projectId: 100,
		name: 'AW Fullstack',
		path: 'C:/Users/Felhasznalo/dev/aw-fullstack/',
		server:  {
			type: 'express',
			target: 'C:/Users/Felhasznalo/dev/aw-fullstack/public_html'
		},
		sass: {
			enabled: true,
			outputDir: 'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/style/dist',
			globs: [
				'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/style/src/var.scss', 
				'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/style/src/**/*.scss'
			]
		},
		javascript: {
			enabled: false,
			outputDir: 'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/js/dist',
			globs: [
				'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/js/src/index.js',
				'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/js/src/**/*.js',
			]
		},
		dependencyManagement: {
			enabled: false
		}
	},
	'101': {
		id: 101,
		projectId: 101,
		name: 'Another Project',
		path: '',
		server:  {
			type: 'proxy',
			target: 'project.dev'
		},
		sass: {
			enabled: false,
			outputDir: '',
			globs: []
		},
		javascript: {
			enabled: false,
			outputDir: '',
			globs: []
		},
		dependencyManagement: {
			enabled: false
		}
	}
};

export function fetchConfig(id) {
	return (dispatch: Function, getState: Function) => {
		if (getState && getState().configs[id]) {
			dispatch(recievedConfigs(getState().configs, id));
		} else {
		    storage.get('configs', function(error, data) {
				if (error) throw error;
				console.warn('RECIEVED_CONFIGS providing demoData in case user has no data', data);
				// data.currentConfigId = false; // to force reload from demoData
				dispatch(recievedConfigs(data.currentConfigId ? data : demoData, id));
			});
		}
	}
}

export function recievedConfigs(configs, currentConfigId) {
	return {
		type: RECIEVED_CONFIGS,
		payload: { configs, currentConfigId }
	};
}

export function updateProperty(key, property, newValue, globIndex = false) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		if (globIndex !== false) {
			dispatch(setGlob(key, property, newValue, globIndex));
		} else if (!property) {
		    dispatch(setRootProperty(key, newValue, state.configs.currentConfigId));
		} else {
		    dispatch(setProperty(key, property, newValue));
		}

		setTimeout(() => {
			saveState(state.configs);
		}, 300);
	}
}

export function setGlob(key, property, newValue, globIndex) {
	return {
		type: SET_GLOB,
		payload: { key, property, newValue, globIndex }
	};
}

export function setProperty(key, property, newValue) {
	return {
		type: SET_PROPERTY,
		payload: { key, property, newValue}
	};
}

export function setRootProperty(key, newValue, projectId) {
	return {
		type: SET_ROOT_PROPERTY,
		payload: { key, newValue, projectId }
	};
}

function saveState(configs) {
	storage.set('configs', configs, function(error) {
		if (error) throw error;
	});
}