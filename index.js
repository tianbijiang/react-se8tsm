import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import value1Reducer from './value1Reducer';
import value2Reducer from './value2Reducer';
import action1 from './action1';
import action2 from './action2';

const rootReducer = combineReducers({
  value1FromRedux: value1Reducer,
  value2FromRedux: value2Reducer,
});

const store = createStore(rootReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherProp: Math.random(),
      myProp: true,
      storeValue1: 0,
      storeValue2: 0,
    };
  }
  
  render() {
    return (
      <div>
        <div>
          update redux store value 1: 
          <button onClick={() => {
            const storeValue1 = this.state.storeValue1;
            this.setState({ storeValue1: storeValue1+1 });
            store.dispatch(action1(storeValue1+1));
          }}>+</button>
          {this.state.storeValue1}
          <button onClick={() => {
            const storeValue1 = this.state.storeValue1;
            this.setState({ storeValue1: storeValue1-1 });
            store.dispatch(action1(storeValue1-1));
          }}>-</button>
        </div>

        <div>
          update redux store value 2: 
          <button onClick={() => {
            const storeValue2 = this.state.storeValue2;
            this.setState({ storeValue2: storeValue2+1 });
            store.dispatch(action2(storeValue2+1));
          }}>+</button>
          {this.state.storeValue2}
          <button onClick={() => {
            const storeValue2 = this.state.storeValue2;
            this.setState({ storeValue2: storeValue2-1 });
            store.dispatch(action2(storeValue2-1));
          }}>-</button>
        </div>
        
        <div>
          <button onClick={() => this.setState({ myProp: !this.state.myProp })}>pass my prop to children from parent:</button>
          {JSON.stringify(this.state.myProp)}
        </div>
        <div>
          <button onClick={() => this.setState({
            otherProp: Math.random()
          })}>
          pass irrelevant prop to children from parent
          </button>
        </div>
        =====
        <div>
          <Hello myProp={this.state.myProp} otherProp={this.state.otherProp}/>
          <Hello myProp={this.state.myProp} otherProp={this.state.otherProp}/>
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));