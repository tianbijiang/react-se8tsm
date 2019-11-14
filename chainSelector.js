import anotherSelector from './anotherSelector';
import { createSelector } from 'reselect';
import { memoize } from 'lodash';

// another end selector
const chainSelector = memoize((myProp) => createSelector(
  [anotherSelector(myProp)],
  (value) => {
    console.log("chained selector invoked");
    return `${value} is an ${value%2 ? 'odd' : 'even'} number`;
  }
));

export default chainSelector;