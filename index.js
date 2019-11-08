import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import valueReducer from './valueReducer';
import action from './action';

const rootReducer = combineReducers({
  valueFromRedux: valueReducer,
});

const store = createStore(rootReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherProp: Math.random(),
      myProp: 0,
      textbox1: 0,
      textbox2: 0,
    };
  }
  
  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.textbox1} onChange={e => this.setState({ textbox1: e.target.value })}/>
          <button onClick={() => this.setState({
            myProp: this.state.textbox1,
          })}>
            pass my prop to children from parent
          </button>
        </div>
        <div>
          <button onClick={() => this.setState({
            otherProp: Math.random()
          })}>
            pass irrelevant prop to children from parent
          </button>
        </div>
        <div>
          <input type="text" value={this.state.textbox2} onChange={e => this.setState({ textbox2: e.target.value })}/>
          <button onClick={() => store.dispatch(action(this.state.textbox2))}>
            update redux store with value
          </button>
        </div>
        <div>
          <Hello myProp={this.state.myProp} otherProp={this.state.otherProp}/>
          <Hello myProp={this.state.myProp} otherProp={this.state.otherProp}/>
        </div>
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('root'));