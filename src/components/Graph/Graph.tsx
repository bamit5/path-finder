import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import Node from '../Node/Node';
import './Graph.scss';
import {
  ChangeableNodeData,
  Graph as GraphType,
} from '../../constants/constants';
import { RootState } from '../../redux/reducers';
import graphActions from '../../redux/actions/graph';

interface GraphProps {
  width: number;
  height: number;
}

interface StateProps {
  graph: GraphType;
}

interface DispatchProps {
  initGraph: (width: number, height: number) => void;
  changeNode: (change: ChangeableNodeData) => void;
}

const Graph: React.FC<GraphProps & StateProps & DispatchProps> = ({
  width,
  height,
  graph,
  initGraph,
  changeNode,
}) => {
  useEffect(() => {
    // create initial graph
    initGraph(width, height);
  }, [width, height]);

  return (
    <div className="graph-wrapper">
      {graph.map((row, x) => (
        <div>
          {row.map((node, y) => (
            // create a node for each index in the 2d array
            <Node
              point={{ x, y }}
              type={node.type}
              visited={node.visited}
              taken={node.taken}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  graph: state.graph.graph,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  initGraph: (width, height) => dispatch(graphActions.initGraph(width, height)),
  changeNode: (change) => dispatch(graphActions.changeNode(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
