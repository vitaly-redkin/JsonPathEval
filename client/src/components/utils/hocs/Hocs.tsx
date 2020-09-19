import React from 'react';

import { Helmet } from 'react-helmet';

/**
 * HOC function to wrap a router "page" component with the page title.
 * Adds <Helmet/> to set the browser page title.
 *
 * @param WrappedComponent component to wrap
 * @param pageTitle title of the browser page to set
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withTitle(WrappedComponent: any, pageTitle: string) {
  return (props: object): JSX.Element => (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <WrappedComponent {...props} />
    </>
  );
}
