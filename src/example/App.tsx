import React, { useState, useCallback } from "react";
import { Siema } from "../lib";
import SiemaLib from "siema";

import pinkImage from "./assets/siema--pink.svg";
import yellowImage from "./assets/siema--yellow.svg";

export function App() {
  const [siemaInstance, setSiemaInstance] = useState<SiemaLib>();
  const getSiemaInstance = useCallback((retrievedSiemaInstance: SiemaLib) => {
    setSiemaInstance(retrievedSiemaInstance);
  }, []);

  const triggerPrev = useCallback(() => {
    if (siemaInstance) {
      siemaInstance.prev();
    }
  }, [siemaInstance]);
  const triggerNext = useCallback(() => {
    if (siemaInstance) {
      siemaInstance.next();
    }
  }, [siemaInstance]);
  return (
    <div style={{ width: "300px" }}>
      <Siema getSiemaInstance={getSiemaInstance}>
        <img alt="pink slide" src={pinkImage} style={{ width: "100%" }} />
        <img alt="yellow slide" src={yellowImage} style={{ width: "100%" }} />
      </Siema>
      <button onClick={triggerPrev}>Prev</button>
      <button onClick={triggerNext}>Next</button>
    </div>
  );
}
