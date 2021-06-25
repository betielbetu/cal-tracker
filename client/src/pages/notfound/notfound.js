import React from "react";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function NotFound() {
	const pizzaIcon = <FontAwesomeIcon size="7x" icon={["fas", "pizza-slice"]}/>
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
				</Col>
			</Row>
			<Row className="mt-5">
				<Col className="text-center not-found">
					Sorry, Page Not Found
				</Col>
			</Row>
		</Col>
	);
}
