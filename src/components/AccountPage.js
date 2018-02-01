import React from 'react';
import PropTypes from 'prop-types';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangePage from './PasswordChangePage';
import withAuthorization from './withAuthorization';

const AccountPage = (props, { authUser }) => (
	<div>
		<h1>Account: {authUser ? authUser.email : ''}</h1>
		<PasswordForgetForm />
		<PasswordChangePage />
	</div>
);

const authCondition = authUser => !!authUser;

AccountPage.contextTypes = {
	authUser: PropTypes.object
};

export default withAuthorization(authCondition)(AccountPage);
