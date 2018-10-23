import * as React from "react";
import { Siema } from "src/lib";

import pinkImage from "src/example/assets/siema--pink.svg";
import yellowImage from "src/example/assets/siema--yellow.svg";

export class App extends React.Component {
  private siemaRef?: Siema | null;
  public render() {
    return (
      <div style={{ width: "300px" }}>
        <Siema ref={this.setRef}>
          <img src={pinkImage} style={{ width: "100%" }} />
          <img src={yellowImage} style={{ width: "100%" }} />
        </Siema>
        <button onClick={this.triggerPrev}>Prev</button>
        <button onClick={this.triggerNext}>Next</button>
      </div>
    );
  }

  private setRef = (elem: Siema | null): void => {
    this.siemaRef = elem;
  };

  private triggerPrev = (): void => {
    if (!this.siemaRef) {
      this.logSiemaMissing();
      return;
    }
    this.siemaRef.prev();
  };

  private triggerNext = (): void => {
    if (!this.siemaRef) {
      this.logSiemaMissing();
      return;
    }
    this.siemaRef.next();
  };

  private logSiemaMissing(): void {
    const message =
      "Siema instance is not available. It may not have been instantiated yet.";
    // tslint:disable-next-line
    console.error(message);
  }
}
