import { useRef, useEffect } from "react";

const useEffectOnlyOnUpdate = (callback, dependencies) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      return callback();
    } else {
      didMount.current = true;
      return;
    }
  }, dependencies);
};

export default useEffectOnlyOnUpdate;
