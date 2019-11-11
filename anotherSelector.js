import selector from './selector';
import { createSelector } from 'reselect';
import { memoize } from 'lodash';

const anotherSelector = memoize((myProp) => createSelector(
  [selector(myProp)],
  (value) => {
    console.log("chaining selector invoked");
    return `${value} is an ${value%2 ? 'odd' : 'even'} number`;
  }
));

export default anotherSelector;