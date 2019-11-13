import selector from './selector';
import { valueSelector } from './selector';
import { createSelector } from 'reselect';
import { memoize } from 'lodash';

const anotherSelector = memoize((myProp) => createSelector(
  [valueSelector(myProp)],
  (value) => {
    console.log("derived selector invoked");
    return `${value} is an ${value%2 ? 'odd' : 'even'} number`;
  }
));

export default anotherSelector;