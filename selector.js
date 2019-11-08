import { createSelector } from 'reselect';
import { memoize } from 'lodash';

// Option 1
// const valueSelector = (state, myProp) => `value from redux: ${state.valueFromRedux} , value from prop: ${myProp}`;
// const selector = () => createSelector(
//   [valueSelector],
//   value => {
//     console.log(`selector selected: ${value}`);
//     return value;
//   }
// );

// Option 2
const valueSelector = (state) => `value from redux: ${state.valueFromRedux}`;
const selector = memoize((myProp) => createSelector(
  [valueSelector],
  value => {
    console.log(`${value} , value from prop: ${myProp}`);
    return `${value} , value from prop: ${myProp}`;
  }
));

export default selector;