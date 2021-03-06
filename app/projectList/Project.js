// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import styles from './Project.css';

const iconButtonElement = (
  <IconButton touch={true}>
    <MoreVertIcon/>
  </IconButton>
);

const linkStyle = {
	color: 'white',
    textDecoration: 'none',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '48px',
    left: '0',
    padding: '0 15px'
};

export default class Project extends Component {
	stateToggleLabel(project) {
		return project.running ? "Stop" : "Start"
	}

	projectStarting() {
		return this.props.data.projects.filter(project => project.starting).length > 0
	}

	getProjectClassName() {
		const project = this.props.data.project;
		let elClass;

		if (this.projectStarting() && !project.starting && !project.running) {
			elClass = 'disabled';
		} else {
			elClass = (
				((project.starting) ? 'starting' : '') +
				((project.running) ? 'running' : '') +
				((!project.running && !project.starting) ? 'idle' : '')
			);
		}

		return elClass;
	}

	renderBuildButton(project, config) {
		if (
			config && (
				config.javascript.enabled || 
				config.cachebust.enabled || 
				config.sass.enabled || 
				config.dependencyManagement.enabled
			)
		) {
			return(<MenuItem 
					onTouchTap={() => {this.props.actions.startBuild(project.id, undefined, true)}}
					disabled={project.running}
				><span className={styles.span} disabled={project.running}>Build</span></MenuItem>)
		} else {
			return null;
		}
	}

	render() {
		const { project, config } = this.props.data;
		
		return (config) ? (
			<div className={styles[this.getProjectClassName()]}>
				<ListItem
					onTouchTap={() => {this.props.actions.toggleProject(project)}}
					leftAvatar={<Avatar icon={<FileFolder />} />}
					rightIconButton={
						<IconMenu 
							iconButtonElement={iconButtonElement}
							anchorOrigin={{horizontal: 'right', vertical: 'top'}}
							targetOrigin={{horizontal: 'right', vertical: 'top'}}
						>
						    <MenuItem onTouchTap={() => {this.props.actions.toggleProject(project)}}>{this.stateToggleLabel(project)}</MenuItem>
						    {this.renderBuildButton(project, config)}
						    <MenuItem disabled={project.running}>
						    	<Link 
						    		to={`/config/${project.configId}`} 
						    		style={linkStyle}
						    		className={styles.link}
						    		disabled={project.running}
						    	>Options</Link>
						    </MenuItem>
						    <Divider />
						    <MenuItem onTouchTap={() => {this.props.actions.deleteProject(project)}}>Delete</MenuItem>
						</IconMenu>
					}
					primaryText={config.name}
					secondaryText={project.state}
					className={styles.listItem}
				/>
			</div>
		) : null;
	}
}
