import React, { useState, useRef} from "react";
import foodApi from "../../api/food.service";
import {Alert, Col, Form} from "react-bootstrap";
import {positions} from "react-alert";
import foodService from "../../services/food.service";
import {Input} from "@material-ui/core";

const isNumber = (value) => {
	const numValue = parseFloat(value);
	if (isNaN(numValue)) {
		return (
			<Alert variant="danger">
				Only Numbers Allowed!
			</Alert>
		);
	}
	if (numValue < 1){
		return (
			<Alert variant="danger">
				Enter a number greater than 0!
			</Alert>
		);
	}
};

const FoodForm = (props) => {
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [carbs, setCarbs] = useState('');
	const [fats, setFats] = useState('');
	const [proteins, setProteins] = useState('');
	const [calories, setCalories] = useState('');
	const [errors, setErrors] = useState({});


	const onChangeName = (e) => {
		setName(e.target.value);
	};

	const onChangeCarbs = (e) => {
		setCarbs(e.target.value);
	};

	const onChangeFats = (e) => {
		setFats(e.target.value);
	};

	const onChangeProteins = (e) => {
		setProteins(e.target.value);
	};
	const onChangeCalories = (e) => {
		setCalories(e.target.value);
	};

	const showError = (message) => {
		props.alert.error(message, { position: positions.MIDDLE })
	}

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const numberCheck = (value, title) => {
		let error = '';
		let hasError = false;
		let floatVal = parseFloat(value);
		if (isNaN(floatVal)){
			error = `${capitalizeFirstLetter(title)} must be a number`;
			hasError = true;
		} else if (floatVal < 0){
			error = `${capitalizeFirstLetter(title)} must be at least 0`;
			hasError = true;
		}

		return {error, hasError};
	}

	const saveFood = (e) => {
		e.preventDefault();
		setLoading(true);
		const errorObj = {};

		//handle validation
		setErrors({});
		errorObj.name = !name ? "Food Name is Required" : ''

		//carbs
		const carbResults = numberCheck(carbs, "carbs");
		errorObj.carbs = carbResults.hasError ? carbResults.error : '';

		const fatResults = numberCheck(fats,"fats");
		errorObj.fats = fatResults.hasError ? fatResults.error : '';

		const proteinResults = numberCheck(proteins,"protein");
		errorObj.proteins = proteinResults.hasError ? proteinResults.error : '';

		const calResults = numberCheck(calories,"calories");
		errorObj.calories = calResults.hasError ? calResults.error : '';

		const hasErrors = errorObj.name || errorObj.carbs || errorObj.fats || errorObj.proteins || errorObj.calories;
		setErrors(errorObj);
		if (!hasErrors) {
			const foodObj = {
				name, carbs, fats, proteins, calories
			};

			foodApi.addFood(foodObj)
				.then(results => {
					foodService.sendNewFood();
					setLoading(false);
					clearForm();
				})
				.catch(err => {
					const error = err && err.response && err.response.data ? err.response.data.error : err;
					showError(error);
					setLoading(false);
				})
		}else{
			setLoading(false);
		}
	};

	const clearForm = () => {
		setName('');
		setCarbs('');
		setFats('');
		setProteins('');
		setCalories('');
	}

	return (
		<div>
			<h4>Add New Food</h4>
			<Form onSubmit={saveFood} className="mt-4">
				<div className="form-group">
					<div className="form-wrapper">
						<label htmlFor="email" className="text-start w-100 column">Food Name</label>
						{errors.name ? <div className="error column">{errors.name}</div> : ''}
					</div>
					<Input
						type="text"
						className="form-control"
						name="name"
						value={name}
						onChange={onChangeName}
						placeholder="Enter Food Here"
					/>
				</div>

				<div className="form-group mt-3">
					<div className="form-wrapper">
						<label htmlFor="carbs" className="text-start w-100 column">Carbs</label>
						{errors.carbs ? <div className="error column">{errors.carbs}</div> : ''}
					</div>
					<Input
						type="number"
						className="form-control"
						name="carbs"
						value={carbs}
						onChange={onChangeCarbs}
						placeholder="Enter Carbs Here"
					/>
				</div>

				<div className="form-group mt-3">
					<div className="form-wrapper">
						<label htmlFor="fats" className="text-start w-100 column">Fats</label>
						{errors.fats ? <div className="error column">{errors.fats}</div> : ''}
					</div>
					<Input
						type="number"
						className="form-control"
						name="fats"
						value={fats}
						onChange={onChangeFats}
						placeholder="Enter Fats Here"
					/>
				</div>

				<div className="form-group mt-3">
					<div className="form-wrapper">
						<label htmlFor="proteins" className="text-start w-100 column">Proteins</label>
						{errors.proteins ? <div className="error column">{errors.proteins}</div> : ''}
					</div>
					<Input
						type="number"
						className="form-control"
						name="proteins"
						value={proteins}
						onChange={onChangeProteins}
						placeholder="Enter Protein Here"
					/>
				</div>

				<div className="form-group mt-3">
					<div className="form-wrapper">
						<label htmlFor="calories" className="text-start w-100 column">Calories</label>
						{errors.calories ? <div className="error column">{errors.calories}</div> : ''}
					</div>
					<Input
						type="number"
						className="form-control"
						name="calories"
						value={calories}
						onChange={onChangeCalories}
						placeholder="Enter Calories Here"
					/>
				</div>

				<Col md={{span: 4, offset: 4}} className="form-group mt-3">
					<button className="btn btn-block btn-login w-100" disabled={loading}>
						{loading && (
							<span className="spinner-border spinner-border-sm"></span>
						)}
						<span>Save Food!</span>
					</button>
				</Col>
			</Form>
		</div>
	);
};

export default FoodForm;
