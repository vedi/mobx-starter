import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

@inject('ui')
@observer
class BaseList extends React.Component {

  static propertyTypes = {
    module: React.PropTypes.any,
  };

  // When route is loaded (isomorphic)
  static onEnter(props) {
    const { ui, module: { name, metadata }, [name]: store } = props;
    ui.title = metadata.listTitle || metadata.resource;
    return store.fetchList();
  }

  componentWillMount() {
    // TODO: Make it run 1 time. Now it runs twice in server side rendering.
    BaseList.onEnter(this.props);
  }

  styles = {
    actionColumn: {
      width: 32,
    },
    fab: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  };

  render() {
    const { module } = this.props;
    const { name, metadata, Menu } = module;
    const store = this.props[name];
    const fieldNames = _.reduce(
      metadata.fields, (result, value, key) => {
        if (value.showInTable) {
          result.push(key);
        }
        return result;
      },
      []);
    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {fieldNames.map(fieldName => (
                <TableHeaderColumn key={fieldName}>
                  {metadata.fields[fieldName].label || fieldName}
                </TableHeaderColumn>
              ))}
              <TableHeaderColumn style={this.styles.actionColumn} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {store.list.map(item => (
              <TableRow key={item._id}>
                {fieldNames.map(fieldName => (
                  <TableRowColumn key={`${fieldName}_${item._id}`}>
                    {item[fieldName]}
                  </TableRowColumn>
                ))}
                <TableRowColumn style={this.styles.actionColumn}>
                  <Menu module={module} id={item._id} />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link to={`/${metadata.resource}/create`}>{
          ({ onClick }) =>
            <FloatingActionButton onClick={onClick} style={this.styles.fab}>
              <ContentAdd />
            </FloatingActionButton>
        }</Link>
      </div>
    );
  }
}

export default BaseList;
