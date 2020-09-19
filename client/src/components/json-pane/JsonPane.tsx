import * as React from 'react';

import { connect } from 'react-redux';
import JSONTree from 'react-json-tree'

import { IApplicationState } from '../../store';
import { IJsonState } from '../../store/JsonHandler';


import './JsonPane.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps extends IJsonState {
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps;


/**
 * The component to show JSON evaluation results.
 */
function JsonPane(props: OwnProps): JSX.Element {
  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <div className="w-100 json-pane">
        <JSONTree 
          data={props.json}
          invertTheme={true}
        />
      </div>
    );
  }

  return render();
}


// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
    ...state.json
  };
}

export default connect(mapStateToProps)(JsonPane,);
