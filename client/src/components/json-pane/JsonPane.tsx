import * as React from 'react';

import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';

import { IApplicationState, actionCreators } from '../../store';

import './JsonPane.css';

/**
 * Interface for the component own props.
 */
interface IOwnProps{
  json: object;
  selectedPointers: string[];
}

/**
 * Composite type for the component properties.
 */
type OwnProps = IOwnProps & typeof actionCreators;

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

// Sample JSONTree theme (without it an inversion does not work)
const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

/**
 * The component to show JSON evaluation results.
 */
function JsonPane(props: OwnProps): JSX.Element {
  /**
   * Returns class name to use with JSONTree labels and values.
   * 
   * @param keyPath array with JSONTree node key path parts
   */
  const getClassName = (keyPath: React.ReactText[]): string => {
    const pointer: string = composePointer(keyPath);
    return (props.selectedPointers.find(p => pointer.startsWith(p)) ? 'selected' : '');
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
          theme={theme}
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
    json: state.json.json,
    selectedPointers: state.json.selectedPointers,
  };
}

export default connect(mapStateToProps, actionCreators)(JsonPane,);
