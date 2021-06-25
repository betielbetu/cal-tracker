import React, {useEffect, useState} from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import foodService from "../../services/food.service";
import {Col, Row} from "react-bootstrap";

const FoodChart = (props) => {
	const [showFood, setShowFood] = useState(false);
	const [carbs, setCarbs] = useState(0);
	const [fats, setFats] = useState(0);
	const [protein, setProtein] = useState(0);
	const [name, setName] = useState('');
	const [calories, setCalories] = useState('');

	const updateChart = (food) => {
		setCarbs(parseInt((food.carbs / food.calories) * 100));
		setFats(parseInt((food.fats / food.calories) * 100));
		setProtein(parseInt((food.proteins / food.calories) * 100));
		setName(food.name);
		setCalories(food.calories);
	}

	useEffect(() => {
		//create a subscription to watch for food changes
		const subscription = foodService.getCurrentFood().subscribe((food) => {
			updateChart(food);
			setShowFood(true);
		});

		return () => {
			//unsubscribe when leaving the page
			subscription.unsubscribe();
		}
	}, []);

	return (
		<React.Fragment>
			{showFood ?
				<React.Fragment>
					<Row>
						<Col md={{span: 4, offset: 1}}><h4>{name}</h4></Col>
						<Col md={{span: 6}} className="text-end"><h4>{`${calories} Cal`}</h4></Col>
					</Row>
					<div className="semiprogressbar-container mt-2">
						<div className="Circle me-3">
							<div>
								<SemiCircleProgressBar diameter={200} percentage={carbs} showPercentValue
								                       stroke="#00aaff"/>
								<p style={{color: "#00aaff"}}>CARBS</p>
							</div>
						</div>

						<div className="Circle me-3">
							<div>
								<SemiCircleProgressBar diameter={200} percentage={fats} showPercentValue
								                       stroke="#ffea00"/>
								<p style={{color: "#ffea00"}}>FATS</p>

							</div>
						</div>

						<div className="Circle">
							<div>
								<SemiCircleProgressBar diameter={200} percentage={protein} showPercentValue
								                       stroke="#00ff6e"/>
								<p style={{color: "#00ff6e"}}>PROTEINS</p>
							</div>
						</div>
					</div>
				</React.Fragment> : <div className="pick-food">Pick a Food to display the details</div>}
		</React.Fragment>
	)
}

export default FoodChart;
