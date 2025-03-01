'use client';

import { PropsWithChildren, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { makeStore, AppStore } from '../store';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function AppProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <ConvexProvider client={convex}>
      <ReduxProvider store={storeRef.current}>
        {children}
      </ReduxProvider>
    </ConvexProvider>
  );
}
