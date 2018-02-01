import React, { Component } from 'react';
import { auth } from '../firebase';

const PasswordChangePage = () => (
	<div>
		<h1>Password Change Page</h1>
		<PasswordChangeForm />
	</div>
);

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: ''
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE
		};
	}

	onSubmit = event => {
		event.preventDefault();
		const { passwordOne } = this.state;

		auth
			.doPasswordUpdate(passwordOne)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch(error => {
				this.setState({ error: error.message });
			});
	};
	render() {
		const { passwordOne, passwordTwo, error } = this.state;
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="password"
					value={passwordOne}
					placeholder="New Password"
					onChange={event =>
						this.setState(byPropKey('passwordOne', event.target.value))
					}
				/>
				<input
					type="password"
					value={passwordTwo}
					placeholder="Confirm Password"
					onChange={event =>
						this.setState(byPropKey('passwordTwo', event.target.value))
					}
				/>
				<button disabled={isInvalid} type="submit">
					Submit
				</button>
				{error && <p>{error}</p>}
			</form>
		);
	}
}

export default PasswordChangePage;
