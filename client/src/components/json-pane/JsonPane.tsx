import * as React from 'react';

import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';
import { JSONPath } from 'jsonpath-plus';

import { IApplicationState } from '../../store';

import './JsonPane.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps{
  jsonStr: string;
  json: object;
  pathExpr: string;
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps;

/**
 * Composes JSONTree node key path parts into JSONPath-compatible pointer.
 * 
 * @param keyPath array with JSONTree node key path parts
 */
function composePointer(keyPath: React.ReactText[]): string {
  return keyPath.reduceRight<string>( 
    (
      prev: string, 
      current: React.ReactText
    ): string => `${prev}${current === 'root' ? '' : `/${current}`}`
    , ''
  ) + '/';
}

/**
 * The component to show JSON evaluation results.
 */
function JsonPane(props: OwnProps): JSX.Element {
  const t1 = new Date().getTime();     
  const selectedPointers: string[] = (JSONPath({
    path: props.pathExpr, 
    json: props.json,
    resultType: 'pointer',
  }) as string[]).map(p => `${p}/`)
  const t2 = new Date().getTime();     
  console.log(`${selectedPointers.length} pointers found in ${t2 - t1}ms`);
  //console.log(selectedPointers);

  /**
   * Returns class name to use with JSONTree labels and values.
   * 
   * @param keyPath array with JSONTree node key path parts
   */
  const getClassName = (keyPath: React.ReactText[]): string => {
    const pointer: string = composePointer(keyPath);
    return (selectedPointers.find(p => pointer.startsWith(p)) ? 'selected' : '');
  }
 
  /***
   * JSONTree label renderer.
   */
  const labelRenderer = (keyPath: React.ReactText[]): React.ReactNode => {
    //console.log(composePointer(keyPath));
    return (
      <span className={`${getClassName(keyPath)}`}>{keyPath[0]}</span>
    );
  };


  /***
   * JSONTree value renderer.
   */
  const valueRenderer = (valueAsString: string, value: unknown, ...keyPath: React.ReactText[]): React.ReactNode => {
    return (
      <span className={`${getClassName(keyPath)}`}>{valueAsString}</span>
    );
  };

  /**
   * Component render function.
   */
  const render = (): JSX.Element => {
    return (
      <div className="w-100 json-pane">
        <JSONTree 
          data={props.json}
          invertTheme={true}
          labelRenderer={labelRenderer}
          valueRenderer={valueRenderer}
        />
      </div>
    );
  }

  return render();
}


// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState): IOwnProps {
  return {
    jsonStr: state.json.jsonStr,
    json: state.json.json,
    pathExpr: state.json.pathExpr,
  };
}

export default connect(mapStateToProps)(JsonPane,);
