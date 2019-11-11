import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import value1Reducer from './value1Reducer';
import value2Reducer from './value2Reducer';
import value3Reducer from './value3Reducer';
import action1 from './action1';
import action2 from './action2';
import action3 from './action3';


const rootReducer = combineReducers({
  value1FromRedux: value1Reducer,
  value2FromRedux: value2Reducer,
  value3FromRedux: value3Reducer,
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
      storeValue3: 0,
      child2: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value3FromRedux !== nextProps.value3FromRedux) {
      this.setState({
        storeValue3: value3FromRedux,
      });
    }
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
          <button onClick={() => store.dispatch(action1(this.state.storeValue1))}>
            resend same value
          </button>
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
          <button onClick={() => store.dispatch(action2(this.state.storeValue2))}>
            resend same value
          </button>
        </div>

        <div>
          <button onClick={() => {
            const storeValue3 = Math.random();
            this.setState({ storeValue3 });
            store.dispatch(action3(storeValue3))}
          }>update irrelevant redux store value</button>
          <button onClick={() => store.dispatch(action3(this.state.storeValue3))}>
            resend same value
          </button>
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
          <Hello myProp={this.state.myProp} otherProp={this.state.otherProp}/>
          {this.state.child2 && <Hello myProp={!this.state.myProp} otherProp={this.state.otherProp}/>}
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));