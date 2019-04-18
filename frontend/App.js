import React from 'react';
import {View, Text} from 'react-native';
import {Button, FormLabel, FormInput} from 'react-native-elements';

import Navigation from './Components/Navigation/Navigation';

// import of my reducers
import pictures from './Components/Reducers/pictures.reducer';

// Import modules related to Redux
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({pictures}));

// In App.js, I just need to return my Navigation component. It is inside this component, that my components are rendered.
// I must NOT wrap my Navigation component in a View component since it is not a not a View but only a mecanism of rendering views.
// If you put a View to wrap the component, it will render a white page, with no error.
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>);
  }
}
