import { put, call, takeLatest, select } from 'redux-saga/effects';
import { valueSelector } from './selector';

function* mySaga(action) {
  const result = yield select(valueSelector(action.payload.myProp));
  console.log("from saga ", result);
}

const watchSaga = function* watchSaga() {
    yield takeLatest('UPDATE_SAGA', mySaga);
};


export default watchSaga;