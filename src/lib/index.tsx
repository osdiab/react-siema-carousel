import * as React from "react";
import SiemaLib, { SiemaOptions } from "siema";

export type SiemaProps = Omit<SiemaOptions, "selector">;
export enum SiemaErrorKind {
  SIEMA_INSTANCE_MISSING = "SIEMA_INSTANCE_MISSING"
}
export interface ISiemaError<Data = void> {
  kind: SiemaErrorKind;
  message: string;
  data: Data;
}

/**
 * React wrapper of the Siema library.
 */
export class Siema extends React.Component<SiemaProps> {
  private ref?: HTMLDivElement | null;
  private siemaInstance?: SiemaLib;

  public componentDidMount() {
    if (!this.ref) {
      // disable the next line to log an error without throwing
      // tslint:disable-next-line
      console.error("ref to Siema component was not found, not rendering.");
      return;
    }
    const { children, ...options } = this.props;
    this.siemaInstance = new SiemaLib({ ...options, selector: this.ref });
  }

  public render() {
    return <div ref={this.saveRef}>{this.props.children}</div>;
  }

  public next = (howManySlides?: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!this.siemaInstance) {
        reject(this.logSiemaInstanceMissing());
        return;
      }

      this.siemaInstance.next(howManySlides, () => {
        resolve();
      });
    });
  };

  public prev = (howManySlides?: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!this.siemaInstance) {
        reject(this.logSiemaInstanceMissing());
        return;
      }

      this.siemaInstance.prev(howManySlides, () => {
        resolve();
      });
    });
  };

  public goTo = (index: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!this.siemaInstance) {
        reject(this.logSiemaInstanceMissing());
        return;
      }

      this.siemaInstance.goTo(index, () => {
        resolve();
      });
    });
  };

  // TODO: consider how to support these methods
  // public remove = (index: number): Promise<void> => {
  // }
  // public insert = (item: React.ReactNode, index: number): Promise<void> => {
  // }
  // public prepend = (item: React.ReactNode): Promise<void> => {
  // }
  // public append = (item: React.ReactNode): Promise<void> => {
  // }

  public destroy = (restoreMarkup?: boolean): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!this.siemaInstance) {
        reject(this.logSiemaInstanceMissing());
        return;
      }
      this.siemaInstance.destroy(restoreMarkup, () => {
        this.siemaInstance = undefined;
        resolve();
      });
    });
  };

  public componentWillUnmount() {
    if (this.siemaInstance) {
      this.destroy();
    }
  }

  private logSiemaInstanceMissing(): ISiemaError {
    const message =
      "Siema instance is not available. It may not have been instantiated yet.";
    // tslint:disable-next-line
    console.error(message);
    return {
      data: undefined,
      kind: SiemaErrorKind.SIEMA_INSTANCE_MISSING,
      message
    };
  }

  private saveRef = (elem: HTMLDivElement | null) => {
    this.ref = elem;
  };
}

export { SiemaOptions } from "siema";
