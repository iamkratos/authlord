import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const PasswordForgetPage = () => {
	return (
		<div>
			<h1>Password Forget Page</h1>
			<PasswordForgetForm />
		</div>
	);
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

const INITIAL_STATE = {
	email: '',
	error: null
};

class PasswordForgetForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE
		};
	}

	onSubmit = event => {
		event.preventDefault();
		const { email } = this.state;

		auth
			.doPasswordReset(email)
			.then(() => {
				this.setState({
					...INITIAL_STATE
				});
			})
			.catch(error => {
				this.setState({
					error: error.message
				});
			});
	};

	render() {
		const { email, error } = this.state;
		const { isInvalid } = email === '';
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="email"
					value={email}
					name="email"
					placeholder="Email Address"
					onChange={event =>
						this.setState(byPropKey('email', event.target.value))
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

const PasswordForgetLink = () => (
	<p>
		<Link to="/pw-forget">Forgot Password?</Link>
	</p>
);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
