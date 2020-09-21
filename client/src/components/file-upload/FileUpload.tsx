import * as React from 'react';

import { connect } from 'react-redux';

import { IApplicationState, actionCreators } from '../../store';
import { useSafeCallback as useCallback } from '../utils/custom-hooks/CustomHooks';
import { JsonProcessingStatus } from '../../models/JsonModel';


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
  const { jsonSetStatus, jsonSetString, jsonSetObject, jsonSetError } = props;

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files.length) {
        jsonSetError('');
        jsonSetStatus(JsonProcessingStatus.LoadingFile);
        
        const file: File = e.target.files[0];
        // Timeout is "hack" to let Redux update the store and React to redraw UI after this
        setTimeout(() => { 
          const fileReader: FileReader = new FileReader();

          fileReader.onloadend = (ev: ProgressEvent<FileReader>): void => {
            const s: string = ev.target!.result as string;
            jsonSetString(s);
            jsonSetStatus(JsonProcessingStatus.ParsingFile);
        
            try {
              const json: object = JSON.parse(s);
              jsonSetObject(json);
            } catch (e) {
              jsonSetError(`File parsing error: ${e}`);
            }
            jsonSetStatus(JsonProcessingStatus.Idle);
          }

          fileReader.onerror = (): void => {
            jsonSetError(`File loading error: ${fileReader.error}`);
          }

          setTimeout(() => { fileReader.readAsText(file); }, 100);
        }, 100);

      }
    },
    [jsonSetString, jsonSetObject, jsonSetError, jsonSetStatus]
  );

  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <div className="json-file-upload">
        <label htmlFor="json_file_input">JSON File:</label>
        <input 
          id="json_file_input"
          type="file" 
          accept="application/json" 
          onChange={changeHandler}
          tabIndex={100}
        />
      </div>
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
