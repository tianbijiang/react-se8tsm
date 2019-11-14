export default function (reducerFunction, secReducer, reducerName) {
    return (state, action) => {
        reducerFunction.reducerName = reducerName;
        if (action.payload && action.payload.secReducer !== secReducer && state!==undefined) {
          return state;
        }
        return reducerFunction(state, action);
    };
};
