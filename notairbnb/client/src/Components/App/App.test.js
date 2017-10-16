import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('react-css-modules', () => Component => Component);


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders Router', () => { 
  const wrapper = shallow(<App/>);  
})

