import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import action1 from './action1';
import action3 from './action3';
import reducerCreator from './reducerCreator';
import value1Reducer from './value1Reducer';
import value3Reducer from './value3Reducer';
import saga from './saga';
import Context from './context';

// reuse reducer
const rootReducer = combineReducers({
  value1FromRedux: reducerCreator(value1Reducer, false),
  value2FromRedux: reducerCreator(value1Reducer, true),
  value3FromRedux: value3Reducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherProp: Math.random(),
      storeValue3: parseInt(Math.random()*100),
      child2: false,
    };
  }
  
  render() {
    return (
      <div>
        <div>
          <button onClick={() => {
            store.dispatch(action1({num: parseInt(Math.random()*100), secReducer: false}));
          }}>update redux store value 1</button>
        </div>

        <div>
          <button onClick={() => {
            store.dispatch(action1({num: parseInt(Math.random()*100), secReducer: true}));
          }}>update redux store value 2</button>
        </div>

        <div>
          <button onClick={() => {
            const storeValue3 = parseInt(Math.random()*100);
            this.setState({ storeValue3 });
            store.dispatch(action3({num: storeValue3 }))}
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

        <div><button onClick={() => this.setState({child2: !this.state.child2})}>toggle child2</button></div>

        <div>
          <Context.Provider value={{myProp: true}}>
            <Hello myProp={true} otherProp={this.state.otherProp}/>
          </Context.Provider>
          {this.state.child2 && <Context.Provider myProp={false} value={{myProp: false}}><Hello otherProp={this.state.otherProp}/></Context.Provider>}
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));