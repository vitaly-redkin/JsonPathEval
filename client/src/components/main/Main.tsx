import * as React from 'react';

import { Container, Row, Col } from 'reactstrap';

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { DEFAULT_PAGE_TITLE, PAGE_TITLE_TEMPLATE } from '../../util/util';
import { IApplicationState } from '../../store';
import { JsonProcessingStatus } from '../../models/JsonModel';
import StatusPanel from '../status-panel/StatusPanel';
import FileUpload from '../file-upload/FileUpload';
import JsonPane from '../json-pane/JsonPane'
import JsonPathExpr from '../json-path-expr/JsonPathExpr';

import './Main.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps{
  status: JsonProcessingStatus;
}

/**
 * The main component (to contain everything else).
 */
function Main(props: IOwnProps): JSX.Element {
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

        <Container className={`main ${props.status !== JsonProcessingStatus.Idle ? 'busy' : ''}`}>
          <Row>
            <Col className='text-center'>
              <h2>JSON Path Evaluator</h2>
            </Col>
          </Row>
          <StatusPanel />
          <Row>
            <Col >
              <FileUpload />
            </Col>
          </Row>
          <Row>
           <Col>
              <JsonPathExpr />
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

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
    status: state.json.status,
  };
}

export default connect(mapStateToProps)(Main);
