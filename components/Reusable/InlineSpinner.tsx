import * as React from "react";

interface Props {
  size?: number;
}

const InlineSpinner: React.FC<Props> = ({ size = 20 }) => {
  return (
    <i
      style={{
        width: size,
        height: size,
      }}
      className="c-inline-spinner"
    />
  );
};

export default InlineSpinner;
