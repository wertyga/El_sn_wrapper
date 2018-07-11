import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, render, mount } from 'enzyme';
// import { expect } from 'jest';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.host = 'http://localhost:3001'
// Обрушим тест при любой ошибке
// console.error = message => {
//     console.error(message);
// };

configure({ adapter: new Adapter() });
