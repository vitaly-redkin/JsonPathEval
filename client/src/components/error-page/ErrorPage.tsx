import * as React from 'react';

import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'reactstrap';

import { DEFAULT_PAGE_TITLE, PAGE_TITLE_TEMPLATE } from '../../util/util';

import './ErrorPage.css';

/**
 * The Error Page component.
 */
function ErrorPage(): JSX.Element {
  /**
   * Renders component content.
   */
  const render = (): JSX.Element => {
    return (
      <div className="w-100">
        <Helmet
          titleTemplate={PAGE_TITLE_TEMPLATE}
          defaultTitle={DEFAULT_PAGE_TITLE}
        />


        <div className='error-page'>
          <Container className='align-self-center'>
            <Row>
              <Col className='text-center'>
                <h3>Thank you for using JSON Path Evaluator</h3>
              </Col>
            </Row>
            <Row>
              <Col className='text-center'>
                <p>
                  We are really sorry but some unexpected problem occurred.
                  <br />
                  Our team already notified about this problem and will resolve it a.s.a.p.
                </p>
                <p>
                  Meanwhile please refresh the page and try again to repeat your last action.
                  {' '}
                  <br />
                  If the problem persists please give us some time to fix it.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  };

  return render();
}

export default ErrorPage;
