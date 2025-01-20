// Define reducer actions
export const ACTIONS = {
    SET_DISTANCE: "SET_DISTANCE",
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    SET_LOCATION: "SET_LOCATION",
    SET_RECOMMENDATIONS: "SET_RECOMMENDATIONS",
    RESET: "RESET",
};
  
// Component state reducer
export const initialState = {
distance: "1",
isLoading: false,
error: null,
location: null,
recommendations: [],
showRecommendations: false,
};

export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_DISTANCE:
        return { ...state, distance: action.payload };
        case ACTIONS.SET_LOADING:
        return { ...state, isLoading: action.payload };
        case ACTIONS.SET_ERROR:
        return { ...state, error: action.payload };
        case ACTIONS.SET_LOCATION:
        return { ...state, location: action.payload };
        case ACTIONS.SET_RECOMMENDATIONS:
        return {
            ...state,
            recommendations: action.payload,
            showRecommendations: true,
        };
        case ACTIONS.RESET:
        return initialState;
        default:
        return state;
    }
}
  