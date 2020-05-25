import React, { useEffect, useCallback, useState } from "react";
import SiemaLib, { SiemaOptions } from "siema";

export type SiemaProps = Omit<SiemaOptions, "selector"> & {
  getSiemaInstance?: (siema: SiemaLib) => void;
};

/**
 * React wrapper of the Siema library.
 */
export function Siema({
  children,
  getSiemaInstance,
  ...siemaOptions
}: React.PropsWithChildren<SiemaProps>) {
  const [siemaInstance, setSiemaInstance] = useState<SiemaLib>();
  // destroy Siema on unmount
  useEffect(() => {
    return () => {
      if (siemaInstance) {
        siemaInstance.destroy();
      }
    }
  }, [siemaInstance]);

  // pass siema instance to parent
  useEffect(() => {
    if (siemaInstance && getSiemaInstance) {
      getSiemaInstance(siemaInstance);
    }
  }, [siemaInstance, getSiemaInstance]);

  const ref = useCallback((elem: HTMLDivElement | null) => {
    if (elem && !siemaInstance) {
      setSiemaInstance(new SiemaLib({ ...siemaOptions, selector: elem }));
    }
  }, [])

  return <div ref={ref}>{children}</div>
};
