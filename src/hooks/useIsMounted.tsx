import { useEffect, useState } from "react";

export const useIsMounted = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(true);
  }, []);

  return value;
};
