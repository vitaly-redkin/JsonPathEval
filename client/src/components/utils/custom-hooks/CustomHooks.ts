import React from 'react';

/**
 * Custom hook similar to useState() which checks
 * if the component is still mounted before calling setState().
 *
 * @param initialState initial state to set
 */
export function useSafeState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isMountedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [state, setState] = React.useState<T>(initialState);
  const setSafeState = React.useCallback((newState: T): void => {
    if (isMountedRef.current) {
      setState(newState);
    } /* else {
        console.log('Unmounted!');
        console.log(newState);
      } */
  }, []);

  return [state, setSafeState];
}

/**
 * Implements "safe" version of the React.useCallback() hook by making sure
 * the exception thrown inside the handler will be handled by the error boundary.
 *
 * @param handler event handler to wrap in a callback
 * @param deps array with callback dependencies
 */
export function useSafeCallback(
  handler: Function,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: Array<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): (...params: any[]) => void {
  const [, setError] = useSafeState<Error | null>(null);

  const result = React.useCallback(
    (...params) => {
      try {
        handler(...params);
      } catch (err) {
        setError(() => { throw err; });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return result;
}
