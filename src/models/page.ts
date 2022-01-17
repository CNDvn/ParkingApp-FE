import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

export interface Page {
  path: string;
  exact: boolean;
  component: FunctionComponent<RouteProps>;
}
export interface Props {
  children: JSX.Element;
}
export interface RouteComponent extends Page {
  key: number;
  Component: React.Component;
}
