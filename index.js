import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createSagaMiddleware } from 'redux-saga/defaults';
import action1 from './action1';
import action2 from './action2';
import action3 from './action3';
import actionForSaga from './actionForSaga';
import value1Reducer from './value1Reducer';
import value2Reducer from './value2Reducer';
import value3Reducer from './value3Reducer';

const rootReducer = combineReducers({
  value1FromRedux: value1Reducer,
  value2FromRedux: value2Reducer,
  value3FromRedux: value3Reducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherProp: Math.random(),
      myProp: true,
      storeValue3: parseInt(Math.random()*100),
      child2: false,
    };
  }
  
  render() {
    return (
      <div>
        <div>
          <button onClick={() => {
            store.dispatch(action1(parseInt(Math.random()*100)));
          }}>update redux store value 1</button>
        </div>

        <div>
          <button onClick={() => {
            store.dispatch(action2(parseInt(Math.random()*100)));
          }}>update redux store value 2</button>
        </div>

        <div>
          <button onClick={() => {
            const storeValue3 = parseInt(Math.random()*100);
            this.setState({ storeValue3 });
            store.dispatch(action3(storeValue3))}
          }>update irrelevant redux store value</button>
          {this.props.value3FromRedux}
        </div>

        <div>
          <button onClick={() => this.setState({
            otherProp: Math.random()
          })}>
          pass irrelevant prop to children from parent
          </button>
        </div>

        <div><button onClick={() => store.dispatch(actionForSaga(123))}>fire action for saga value 1</button></div>
        <div><button onClick={() => store.dispatch(actionForSaga(321))}>fire action for saga value 2</button></div>

        <div><button onClick={() => this.setState({child2: !this.state.child2})}>toggle child2</button></div>

        <div>
          <Hello myProp={this.state.myProp} otherProp={this.state.otherProp}/>
          {this.state.child2 && <Hello myProp={!this.state.myProp} otherProp={this.state.otherProp}/>}
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));