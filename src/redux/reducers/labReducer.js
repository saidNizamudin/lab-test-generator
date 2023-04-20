const initialState = {
	value: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const labReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newState;

	switch (type) {
		case 'ADD_TEST':
			newState = [...state.value, { ...payload }];
			return { ...state, value: newState };
		default:
			return state;
	}
};

export default labReducer;
