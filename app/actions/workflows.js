// @flow

export const START_WORKFLOW = 'START_WORKFLOW';
export const STOP_WORKFLOW = 'STOP_WORKFLOW';
export const WORKFLOW_STARTED = 'WORKFLOW_STARTED';
export const WORKFLOW_STOPPED = 'WORKFLOW_STOPPED';

export function startWorkflow(project, projectConfig) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();
		config.load(JSON.stringify(projectConfig));

		if (config.dependencyManagement.enabled) {config.dependencyManagement.task()}
		if (config.sass.enabled) {config.sass.task()}
		if (config.javascript.enabled) {config.javascript.task()}

		let newWorkflow = {
			id: state.length,
			browserSync: config.browserSync.task(
				(data, browserSyncInstance) => {
					dispatch(workflowStarted(project, browserSyncInstance))
				}
			)
		};
		if (config.watch.enabled) {newWorkflow.watch = config.watch.task();}

		return {
			action: START_WORKFLOW,
			payload: newWorkflow
		};
	};
}

export function stopWorkflow() {
	plugin.browserSync.exit();

    return {
		action: STOP_WORKFLOW
	};
}

export function workflowStarted(project, browserSyncInstance) {
	return {
		action: START_WORKFLOW,
		payload: {
			project: project,
			ip: browserSyncInstance.utils.devIp[0],
			port: browserSyncInstance.server._connectionKey
		}
	};
}

export function workflowStopped() {
	
}