export default function (reducerFunction, secReducer, reducerName) {
    return (state, action) => {
        reducerFunction.reducerName = reducerName;
        if (action.payload && secReducer !== action.payload.secReducer) {
          return state;
        }
        return reducerFunction(state, action);
    };
};
