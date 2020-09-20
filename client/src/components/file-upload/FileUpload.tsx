import * as React from 'react';

import { connect } from 'react-redux';

import { IApplicationState, actionCreators } from '../../store';
import { useSafeCallback as useCallback } from '../utils/custom-hooks/CustomHooks';


import './FileUpload.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps {
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps & typeof actionCreators;


/**
 * The file upload component.
 */
function FileUpload(props: OwnProps): JSX.Element {
  const { jsonSetString, jsonSetObject } = props;

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files.length) {
        const fileReader: FileReader = new FileReader();
        fileReader.onloadend = (ev: ProgressEvent<FileReader>): void => {
          const s: string = ev.target!.result as string;
          jsonSetString(s);
          const json: object = JSON.parse(s);
          jsonSetObject(json);

        }
        fileReader.readAsText(e.target.files[0]);
      }
    },
    [jsonSetString, jsonSetObject]
  );

  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <input type="file" 
             className="w-100" 
             accept="application/json" 
             onChange={changeHandler}
             tabIndex={2}
      />
    );
  }

  return render();
}


// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
  };
}

export default connect(mapStateToProps, actionCreators)(FileUpload);
