import React, { Suspense, ComponentType } from 'react';

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
  return (props: WCP) => (
    <Suspense fallback={<div>Loading...</div>}>
      <WrappedComponent {...props} />
    </Suspense>
  );
}
