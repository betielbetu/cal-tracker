import React, { useState, useEffect  } from "react";
import foodApi from "../../api/food.service";
import {Card, Col, Row} from "react-bootstrap";
import {positions} from "react-alert";
import foodService from "../../services/food.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FoodList = (props) => {

	const [food, setFood] = useState([]);
	const deleteIcon = <FontAwesomeIcon size="lg" icon={["fas", "trash-alt"]}/>

	const showError = (message) => {
		props.alert.error(message, { position: positions.MIDDLE })
	}

	//get all the current food for this user
	const getFood = () => {
		foodApi.getFood()
			.then(data => {
				setFood(data.data);
			})
			.catch(err => {
				const error = err && err.response && err.response.data ? err.response.data.error : err;
				showError(error);
			})
	};

	const deleteFood = (food) => {
		//delete this food item
		foodApi.deleteFood(food._id)
			.then(data => {
				getFood();
			})
			.catch(err => {
				const error = err && err.response && err.response.data ? err.response.data.error : err;
				showError(error);
			})
	}

	const setCurrentFood = (food) => {
		foodService.sendCurrentFood(food);
	};

	useEffect(() => {
		getFood(); //when you load get the new food

		//create a subscription to watch for food changes
		const subscription = foodService.receivedNewFood().subscribe(() => {
			getFood();
		});

		return () => {
			//unsubscribe when leaving the page
			subscription.unsubscribe();
		}
	}, []);

	return (
		<div className="ps-4">
			<h4>Food List</h4>
			{food && food.length > 0 ?
				<ul className="list-group food-list">
					{food.map((singleFood, idx) => (
						<li key={idx} className="list-group-item list-group-item-action">
							<Card>
								<Card.Body>
									<Card.Title>
										<Row>
											<Col className="cursor-pointer" onClick={() => setCurrentFood(singleFood)}>
												{singleFood.name}
											</Col>
											<Col className="text-end">
												<span className="cursor-pointer" onClick={() => deleteFood(singleFood)}>{deleteIcon}</span>
											</Col>
										</Row>
									</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">{`${singleFood.calories} Cal`}</Card.Subtitle>
									<div className="card-text cursor-pointer" onClick={() => setCurrentFood(singleFood)}>
										<div>{`${singleFood.proteins} g of protein`}</div>
										<div>{`${singleFood.carbs} g of carbs`}</div>
										<div>{`${singleFood.fats} g of fats`}</div>
									</div>
								</Card.Body>
							</Card>
						</li>
					))}
				</ul> : <div className="text-center no-food">No Food Found</div> }
		</div>
	);
}

export default FoodList;
