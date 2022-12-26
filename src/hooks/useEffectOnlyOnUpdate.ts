import { useRef, useEffect } from "react";

export const useEffectOnlyOnUpdate = (
  callback: Function,
  dependencies: any
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback(dependencies);
    } else {
      didMount.current = true;
    }
  }, [callback, dependencies]);
};
