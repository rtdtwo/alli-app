import { StackActions } from '@react-navigation/routers';
import * as React from 'react';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
}

export const replace = (name, params) => {
  navigationRef.current?.dispatch(StackActions.replace(name, params))
}

export const goBack = () => {
  navigationRef.current?.goBack(null)
}