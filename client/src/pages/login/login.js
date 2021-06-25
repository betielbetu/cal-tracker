import React, {useContext, useRef, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Alert, Col, Row} from "react-bootstrap";
import userService from "../../api/user.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import {AuthDataContext} from "../../auth/authWrapper";

const required = (value) => {
	if (!value) {
		return (
			<Alert variant="danger">
				This field is required!
			</Alert>
		);
	}
};

const Login = (props) => {
	const form = useRef();
	const checkBtn = useRef();

	const authContext = useContext(AuthDataContext)
	const {onLogin} = authContext;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const pizzaIcon = <FontAwesomeIcon size="7x" icon={["fas", "pizza-slice"]}/>

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		setMessage("");
		setLoading(true);

		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			userService.login(email, password).then(
				(authData) => {
					onLogin(authData);
					props.history.push("/home");
					window.location.reload();
				},
				(error) => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					setLoading(false);
					setMessage(resMessage);
				}
			);
		} else {
			setLoading(false);
		}
	};

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
									Login
								</Col>
							</Row>
							<Form onSubmit={handleLogin} ref={form} className="mt-4">
								<div className="form-group">
									<label htmlFor="email" className="text-start w-100">Email</label>
									<Input
										type="text"
										className="form-control"
										name="email"
										value={email}
										onChange={onChangeEmail}
										validations={[required]}
										placeholder="Email Address"
									/>
								</div>

								<div className="form-group mt-3">
									<label htmlFor="password" className="text-start w-100">Password</label>
									<Input
										type="password"
										className="form-control"
										name="password"
										value={password}
										onChange={onChangePassword}
										validations={[required]}
										placeholder="Password"
									/>
								</div>

								<Col md={{span: 4, offset: 4}} className="form-group mt-3">
									<button className="btn btn-block btn-login w-100" disabled={loading}>
										{loading && (
											<span className="spinner-border spinner-border-sm"></span>
										)}
										<span>Login</span>
									</button>
								</Col>

								{message && (
									<div className="form-group">
										<div className="alert alert-danger" role="alert">
											{message}
										</div>
									</div>
								)}
								<CheckButton style={{display: "none"}} ref={checkBtn}/>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col className="text-center">
					Don't have an account? <Link to="/register">Click here</Link> to register.
				</Col>
			</Row>
		</Col>
	);
};

export default Login;
