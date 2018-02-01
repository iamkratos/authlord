import React from 'react';
import { withRouter } from 'react-router-dom';
import { PasswordForgetLink } from './PasswordForgetPage';
import { SignUpLink } from './SignUpPage';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) => {
	return (
		<div>
			<h1>Sign In</h1>
			<SignInForm history={history} />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

class SignInForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		event.preventDefault();

		const { email, password } = this.state;
		const { history } = this.props;
		console.log('history', history);

		auth
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({
					...INITIAL_STATE
				});
				history.push(routes.HOME);
			})
			.catch(error => {
				this.setState({ error: error.message });
			});
	};

	render() {
		const { email, password, error } = this.state;
		const isInvalid = password === '' || email === '';
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={event =>
						this.setState(byPropKey('email', event.target.value))
					}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Password"
					onChange={event =>
						this.setState(byPropKey('password', event.target.value))
					}
				/>
				<button disabled={isInvalid}>Submit </button>

				{error && <p>{error}</p>}
			</form>
		);
	}
}

export default withRouter(SignInPage);

export { SignInForm };
