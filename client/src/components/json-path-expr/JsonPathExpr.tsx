import * as React from 'react';

import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import * as lodash from 'lodash';

import { IApplicationState, actionCreators } from '../../store';
import { useSafeState as useState, useSafeCallback as useCallback } from '../utils/custom-hooks/CustomHooks';

import './JsonPathExpr.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps {
  pathExpr: string;
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps & typeof actionCreators;


/**
 * The component to show JSON evaluation results.
 */
function JsonPathExpr(props: OwnProps): JSX.Element {
  const { jsonSetPathExpr } = props;

  const [pathExpr, setPathExpr] = useState<string>(props.pathExpr);

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
   * Does he JSON path search.
   * 
   * @param path JSON path to search with
   */
  const doSearch = useCallback(
    lodash.debounce(
      (path: string): void => {
        jsonSetPathExpr(path);
      },
      300
    ),
    [jsonSetPathExpr]
  );

  /**
   * "Trigger" to run the search when the path expression changes.
   */
  React.useEffect(
    (): void => {
      doSearch(pathExpr.trim());
    },
    [pathExpr, doSearch]
  )


  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <Input 
        type="text" 
        className="w-100" 
        value={pathExpr}
        onChange={changeHandler}
        tabIndex={1}
      />

    );
  }

  return render();
}


// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
    pathExpr: state.json.pathExpr,
  };
}

export default connect(mapStateToProps, actionCreators)(JsonPathExpr);
