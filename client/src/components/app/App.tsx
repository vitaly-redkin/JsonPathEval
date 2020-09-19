import React, { Suspense } from 'react';

import { Provider } from 'react-redux';

import { initialState } from '../../store';
import { configureStore, StoreType } from '../../store/configureStore';
import ErrorPage from '../error-page/ErrorPage';
import Main from '../main/Main';

// Redux store to use in the application
const store: StoreType = configureStore(initialState);

/**
 * Interface for the component own state.
 */
interface IOwnState {
  error: Error | undefined;
}

/**
 * The application root component.
 */
class App extends React.PureComponent<{}, IOwnState> {
  /**
   * Constructor.
   */
  constructor(props: {}) {
    super(props);

    this.state = { error: undefined, };
  }

  /**
   * Catches error raised in the component.
   *
   * @param error Exception occurred in the component
   * @param errorInfo error information
   */
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.log('Uncaught exception:');
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(errorInfo);

    this.setState({ error, });
  }

  /**
   * Renders component UI.
   */
  public render(): JSX.Element {
    if (this.state.error) {
      return (
        <Suspense fallback={null}>
          <ErrorPage />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={null}>
        <Provider store={store}>
          <Main />
        </Provider>
      </Suspense>
    );
  }
}

export default App;
