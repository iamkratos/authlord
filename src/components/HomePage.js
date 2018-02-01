import React from 'react';
import withAuthorization from './withAuthorization';

const HomePage = () => {
	return (
		<div>
			<h1>The Home Page</h1>
			<h2>The Home Page is only accessible to every signed in user</h2>
		</div>
	);
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
