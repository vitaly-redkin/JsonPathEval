import * as React from 'react';

import { connect } from 'react-redux';
import { Row, Col, Alert} from 'reactstrap';

import { IApplicationState } from '../../store';
import { JsonProcessingStatus } from '../../models/JsonModel';

import './StatusPanel.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps{
  status: JsonProcessingStatus;
  error: string;
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps;

/**
 * The component to show JSON evaluation results.
 */
function StatusPanel(props: OwnProps): JSX.Element | null {
  /**
   * Component render function.
   */
  const render = (): JSX.Element | null => {
    let message: string = props.status;
    let alertColor: string = 'info';
    if (props.error) {
      message = props.error;
      alertColor = 'danger';
    } else if (props.status === JsonProcessingStatus.Idle) {
      return null;
    }

    return (
      <Row>
        <Col>
          <Alert className="w-100" color={alertColor}>
            {message}
          </Alert>
        </Col>
      </Row>
    );
  }

  return render();
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
    status: state.json.status,
    error: state.json.error,
  };
}

export default connect(mapStateToProps)(StatusPanel);
