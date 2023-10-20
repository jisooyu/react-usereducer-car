import { useReducer } from 'react';
import { produce } from 'immer';
import { createRandomCar } from '../data';

const ADD_CAR = 'add_car';
const REMOVE_CAR = 'remove_car';

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_CAR:
			state.cars.push(action.payload);
			return;
		case REMOVE_CAR:
			const index = state.cars.indexOf(action.payload);
			state.cars.splice(index, 1);
			return;
		default:
			return;
	}
};

function CarList() {
	const [state, dispatch] = useReducer(produce(reducer), {
		cars: [],
	});
	const handleCarAdd = (car) => {
		dispatch({ type: ADD_CAR, payload: car });
	};
	const handleCarRemove = (car) => {
		dispatch({ type: REMOVE_CAR, payload: car });
	};
	const renderedCarList = state.cars.map((car) => {
		return (
			<li key={car}>
				{car}
				<button
					onClick={() => handleCarRemove(car)}
					className='button is-danger'
				>
					X
				</button>
			</li>
		);
	});
	return (
		<div className='content'>
			<div className='table-header'>
				<h3 className='subtitle is-3'>Car List</h3>
				<div className='buttons'>
					<button
						onClick={() => handleCarAdd(createRandomCar())}
						className='button is-link'
					>
						+ 자동차 추가
					</button>
				</div>
			</div>
			<ul>{renderedCarList}</ul>
		</div>
	);
}

export default CarList;
