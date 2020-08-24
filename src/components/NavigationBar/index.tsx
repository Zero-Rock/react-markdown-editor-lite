import * as React from 'react';
import './index.less';

interface NavigationBarProps {
  left?: React.ReactElement[];
  right?: React.ReactElement[];
  extraLeft?: React.ReactElement | React.ReactElement[];
  extraRight?: React.ReactElement | React.ReactElement[];
  visible: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  return (
    <div className={`rc-md-navigation ${props.visible ? 'visible' : 'in-visible'}`}>
      <div className="navigation-nav left">
        <div className="button-wrap">
          {props.left}
          {props.extraLeft}
        </div>
      </div>
      <div className="navigation-nav right">
        <div className="button-wrap">
          {props.extraRight}
          {props.right}
        </div>
      </div>
    </div>
  );
}
