import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase/index';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => {
	return (
		<div>
			<h1>Sign Up</h1>
			<SignUpForm history={history} />
		</div>
	);
};

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event) {
		event.preventDefault();

		const { username, email, passwordOne, passwordTwo, error } = this.state;

		const { history } = this.props;
		console.log(auth);

		auth
			.doCreateUserWithEmailAndPassword('garyw@gmail.com', 'slim123')
			.then(authUser => {
				console.log('authuser', authUser);
				this.setState(() => ({ ...INITIAL_STATE }));
				history.push(routes.HOME);
			})
			.catch(error => {
				console.log('error error erorr', error);
				this.setState({ error: error.message });
			});
	}

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			email === '' ||
			username === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={username}
					onChange={event =>
						this.setState(byPropKey('username', event.target.value))
					}
					type="text"
					placeholder="Full Name"
				/>
				<input
					value={email}
					onChange={event =>
						this.setState(byPropKey('email', event.target.value))
					}
					type="text"
					placeholder="Email Address"
				/>
				<input
					value={passwordOne}
					onChange={event =>
						this.setState(byPropKey('passwordOne', event.target.value))
					}
					type="password"
					placeholder="Password"
				/>
				<input
					value={passwordTwo}
					onChange={event =>
						this.setState(byPropKey('passwordTwo', event.target.value))
					}
					type="password"
					placeholder="Confirm Password"
				/>
				<button disabled={isInvalid} type="submit">
					Sign Up
				</button>

				{error && <p>{error}</p>}
			</form>
		);
	}
}

const SignUpLink = () => {
	<p>
		Don't have an account?
		{''}
		<Link to={routes.SIGN_UP}>Sign Up</Link>
	</p>;
};
export default withRouter(SignUpPage);
export { SignUpPage, SignUpLink };
