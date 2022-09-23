import { types } from '../actions';

const initialState = {
  data: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_DATA: {
      return {
        ...state,
        data: action.data
      };
    }
    default:
      return state;
  }
};

export default reducer;