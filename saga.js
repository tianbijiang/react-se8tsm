import { put, call, takeLatest, select } from 'redux-saga/effects';
import { valueSelector } from './selector';

function* mySaga(action) {
  const result = yield select(valueSelector(true));
  console.log(action);
}

const watchSaga = function* watchSaga() {
    yield takeLatest('UPDATE_SAGA', mySaga);
};

watchSaga.sagaName = 'watchSaga';

export default watchSaga;