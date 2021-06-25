import React, { useState, useRef, useEffect  } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import userService from "../../api/user.service";
import {Alert, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const required = (value) => {
	if (!value) {
		return (
			<Alert variant="danger">
				This field is required!
			</Alert>
		);
	}
};

const validEmail = (value) => {
	if (!isEmail(value)) {
		return (
			<Alert variant="danger">
				This is not a valid email.
			</Alert>
		);
	}
};

const vPassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<Alert variant="danger">
				The password must be between 6 and 40 characters.
			</Alert>
		);
	}
};

const Register = (props) => {
	const form = useRef();
	const checkBtn = useRef();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");
	const pizzaIcon = <FontAwesomeIcon size="7x" icon={["fas", "pizza-slice"]}/>

	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const onChangeUserName = (e) => {
		const username = e.target.value;
		setUsername(username);
	}

	const handleRegister = (e) => {
		e.preventDefault();

		setMessage("");
		setSuccessful(false);
		setLoading(true);

		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			userService.register(username, email, password).then(
				(response) => {
					setMessage(response.data.message);
					setSuccessful(true);
				},
				(error) => {
					let resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					const possibleError = error.response.data && error.response.data.error;
					const userError = possibleError.includes('username_1 dup key') ? `Sorry, ${username} already exists.` : '';
					//we should handle some specific situations
					resMessage =  userError ? userError : resMessage;
					setMessage(resMessage);
					setLoading(false);
					setSuccessful(false);
				}
			);
		} else {
			setLoading(false);
		}
	};

	const redirectAfterSuccessfulRegister = () => {
		const to={ pathname: `login`, hash: `#hash`};
		const { history: { push } } = props;
		setTimeout(()=>push(to), 5000);
	};

	useEffect(() => {
		if (successful) {
			redirectAfterSuccessfulRegister();
		}
	});

	return (
		<Col md={{span: 6, offset: 3}} className="mt-4">
			<Row>
				<Col className="text-center">
					<Row>
						<Col sm={2} className="text-left icon-color">{pizzaIcon}</Col>
						<Col className="text-right">
							<span className="loginText">Calorie Tracker</span>
						</Col>
					</Row>
					<Row>
						<Col className="text-center mt-5">
							<span className="font-weight-bold">Welcome!</span> Calorie Tracker is a simple nutrition app that helps you keep track of your diet.
						</Col>
					</Row>
					<Row>
						<Col className="text-center mt-3">
							Please log in or register to continue.
						</Col>
					</Row>
					<Row className="mt-4">
						<Col>
							<Row>
								<Col className="text-right title">
									Register
								</Col>
							</Row>
							<Form onSubmit={handleRegister} ref={form} className="mt-4">
								{!successful && (
									<div>

										<div className="form-group">
											<label htmlFor="username" className="text-start w-100">Username</label>
											<Input
												type="text"
												className="form-control"
												name="username"
												value={username}
												onChange={onChangeUserName}
												validations={[required]}
												placeholder="Username"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="email" className="text-start w-100">Email</label>
											<Input
												type="text"
												className="form-control"
												name="email"
												value={email}
												onChange={onChangeEmail}
												validations={[required, validEmail]}
												placeholder="Email Address"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="password" className="text-start w-100">Password</label>
											<Input
												type="password"
												className="form-control"
												name="password"
												value={password}
												onChange={onChangePassword}
												validations={[required, vPassword]}
												placeholder="Password"
											/>
										</div>

										<Col md={{span: 4, offset: 4}} className="form-group mt-3">
											<button className="btn btn-block btn-login w-100" disabled={loading}>
												{loading && (
													<span className="spinner-border spinner-border-sm"></span>
												)}
												<span>Sign Up</span>
											</button>
										</Col>
									</div>
								)}

								{message && (
									<div className="form-group">
										<div
											className={ successful ? "alert alert-success" : "alert alert-danger" }
											role="alert"
										>
											{message}
										</div>
										{ successful && (<div className="success-message text-center">You will be redirected to login in 5 seconds</div>)}
									</div>
								)}
								<CheckButton style={{ display: "none" }} ref={checkBtn} />
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col className="text-center">
					You're registering a new account. If you already have one, you can <Link to="/login">log in</Link>
				</Col>
			</Row>
		</Col>
	);
};

export default Register;
