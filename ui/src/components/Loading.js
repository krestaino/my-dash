import React, { PureComponent } from "react";

import { ReactComponent as IconError } from "../assets/svg/exclamation-triangle-solid.svg";

export default class Loading extends PureComponent {
  render() {
    return this.props.response === false ? (
      <div className="text-red-600">
        <IconError className="mx-auto my-8 w-4" />
      </div>
    ) : (
      <div className="mx-auto my-8 loader" />
    );
  }
}
