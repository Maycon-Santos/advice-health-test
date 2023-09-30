"use client";

import { useEffect } from "react";

export const BootstrapProvider = (props) => {
  const { children } = props;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return children;
};
