import React, {useContext} from "react";
import {Row, Col} from "react-bootstrap";
import FoodForm from "../../components/food-form/food-form.component";
import FoodList from "../../components/food-list/food-list.component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthDataContext} from "../../auth/authWrapper";
import {Button} from "react-bootstrap";
import FoodChart from "../../components/food-chart/food-chart.component";

const Home = (props) => {
	const authContext = useContext(AuthDataContext);
	const {onLogout} = authContext;
	const user = authContext.user.user;

	const pizzaIcon = <FontAwesomeIcon size="7x" icon={["fas", "pizza-slice"]}/>
	const signOutIcon = <FontAwesomeIcon size="lg" icon={["fas", "sign-out-alt"]}/>
	return (
		<Col md={{span: 8, offset: 2}} className="mt-4">
			<Row>
				<Col sm={2} className="text-left icon-color">{pizzaIcon}</Col>
				<Col className="text-right">
					<span className="loginText">Calorie Tracker</span>
				</Col>
				<Col className="text-end">
					<span className="me-4 welcome-text">Welcome {user.username}</span>
					<Button variant="dark" onClick={onLogout} className="button text-left"><span className="mr-1 icon">{signOutIcon}</span><span className="wording">Logout</span></Button>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col>
					<FoodForm/>
				</Col>
				<Col>
					<FoodList/>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col className="border-top">
					<FoodChart/>
				</Col>
			</Row>
		</Col>
	)
};

export default Home;
