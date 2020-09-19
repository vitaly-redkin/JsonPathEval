import * as React from 'react';

import { Container, Row, Col, Input } from 'reactstrap';

import { Helmet } from 'react-helmet';

import { DEFAULT_PAGE_TITLE, PAGE_TITLE_TEMPLATE } from '../../util/util';
import FileUpload from '../file-upload/FileUpload';
import JsonPane from '../json-pane/JsonPane';


import './Main.css';

/**
 * The main component (to contain everything else).
 */
function Main(): JSX.Element {
  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <>
        <Helmet
          titleTemplate={PAGE_TITLE_TEMPLATE}
          defaultTitle={DEFAULT_PAGE_TITLE}
        />

        <Container>
          <Row>
            <Col >
              <FileUpload />
            </Col>
          </Row>
          <Row>
           <Col>
              <Input type="text" className="w-100" defaultValue="JSON Path" />
            </Col>
          </Row>
          <Row>
            <Col>
              <JsonPane />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return render();
}

export default Main;
