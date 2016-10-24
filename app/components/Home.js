// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
        	<header>
	          <h2>Home</h2>
        	</header>
        	<nav>
        		<ul>
        			<li>
						<Link to="/counter">to Counter</Link>
        			</li>
        			<li>
						<Link to="/other">to Other</Link>
        			</li>
        		</ul>
        		
        	</nav>
        </div>
      </div>
    );
  }
}
