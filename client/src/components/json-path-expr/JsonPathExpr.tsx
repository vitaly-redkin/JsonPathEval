import * as React from 'react';

import { connect } from 'react-redux';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import * as lodash from 'lodash';
import { JSONPath } from 'jsonpath-plus';

import { IApplicationState, actionCreators } from '../../store';
import { useSafeState as useState, useSafeCallback as useCallback } from '../utils/custom-hooks/CustomHooks';
import { JsonProcessingStatus } from '../../models/JsonModel';

import './JsonPathExpr.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps {
  pathExpr: string;
  json: object;
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps & typeof actionCreators;


/**
 * The component to show JSON evaluation results.
 */
function JsonPathExpr(props: OwnProps): JSX.Element {
  const { jsonSetPathExpr, jsonSetStatus, jsonSetError, jsonSetSearchResult } = props;

  const [pathExpr, setPathExpr] = useState<string>(props.pathExpr);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(
    (): void => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    },
    []
  )

  /**
   * Callback to set the path expression state value.
   * 
   * @param e event to handle
   */
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPathExpr(e.target.value);
    },
    []
  );

  /**
   * Does the JSON path search.
   * 
   * @param path JSON path to search with
   */
  const doSearch = useCallback(
    lodash.debounce(
      (path: string): void => {
        jsonSetPathExpr(path);
        jsonSetStatus(JsonProcessingStatus.SearchingJson);

        setTimeout(
          () => {
            try {
              const t1 = new Date().getTime();     
              const sp: string[] = (JSONPath({
                path: props.pathExpr, 
                json: props.json,
                resultType: 'pointer',
              }) as string[]).map(p => `${p}/`);
              const t2 = new Date().getTime();     
              console.log(`${sp.length} pointers found in ${t2 - t1}ms`);
              //console.log(sp);
              jsonSetSearchResult(sp);
              jsonSetError('');
            } catch (e) {
              jsonSetError(`Error searching in JSON: ${e}`);
            }
            jsonSetStatus(JsonProcessingStatus.Idle);
          }, 100
        );
      },
      300
    ),
    [props.pathExpr, props.json, jsonSetPathExpr, jsonSetStatus, jsonSetError, jsonSetSearchResult]
  );

  /**
   * Triggers the JSON path search.
   */
  const search = useCallback(
    (): void => {
      doSearch(pathExpr.trim());
    },
    [doSearch, pathExpr]
  );


  /**
   * Sets a sample path expresssion.
   */
  const setSampleExpr = useCallback(
    (): void => {
      const samplePathExpr: string = '$..[?(@.price<10)]';
      setPathExpr(samplePathExpr);
      doSearch(samplePathExpr);
    },
    [doSearch]
  );

  /**
   * "Trigger" to run the search when the path expression changes.
   */
  React.useEffect(
    (): void => {
      search();
    },
    [search, props.pathExpr]
  )

  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <InputGroup className="w-100">
        <Input 
          type="text" 
          value={pathExpr}
          onChange={changeHandler}
          tabIndex={1}
          placeholder="JSON Path Expression like $..[?(@.price<10)]"
          innerRef={inputRef}
          
        />
        <InputGroupAddon addonType="append">
          <Button onClick={setSampleExpr} color="secondary" outline={true} tabIndex={3}>Use Sample</Button>
        </InputGroupAddon>
        <InputGroupAddon addonType="append">
          <Button onClick={search} color="primary" tabIndex={2}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }

  return render();
}


// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
    pathExpr: state.json.pathExpr,
    json: state.json.json,
  };
}

export default connect(mapStateToProps, actionCreators)(JsonPathExpr);
