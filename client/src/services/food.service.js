import {Subject} from 'rxjs';

const newFood = new Subject();
const currentFood = new Subject();

const updateFood = {
	receivedNewFood: () => newFood.asObservable(),
	sendNewFood: () => newFood.next(),

	sendCurrentFood: (food) => currentFood.next(food),
	getCurrentFood: () => currentFood.asObservable(),
}


export default updateFood;
