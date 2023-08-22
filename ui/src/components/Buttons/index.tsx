import React, { PropsWithChildren } from 'react';
import { Button } from 'react-daisyui';
// components

type Props = {
  isRounded: boolean;
};

export const PlainButton: React.FC<PropsWithChildren<Props>> = (props): JSX.Element => {
  const { children } = props;
  return (
    <Button color="primary" className="h-full rounded-r-full rounded-l-none">
      {children}
    </Button>
  );
};
