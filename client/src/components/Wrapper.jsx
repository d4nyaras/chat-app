import React from "react";

function Wrapper({ children, styles }) {
  return (
    <div className={`wrapper-container  overflow-y-auto   ${styles || ""}`}>
      {children}
    </div>
  );
}

export default Wrapper;
