import _ from 'lodash';
import React from 'react';
import { action, reaction, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { FloatingActionButton, IconButton, IconMenu } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Waypoint from 'react-waypoint';
import Loading from '../../../components/common/Loading';
import TableSortLabel from '../../../components/common/TableSortLabel';

@inject('ui')
@observer
class BaseList extends React.Component {

  static propertyTypes = {
    module: React.PropTypes.any,
  };

  // When route is loaded (isomorphic)
  static onEnter(props, sort) {
    const { ui, module, resource } = props;
    const { name, metadata } = module;
    const { [name]: store } = props;

    ui.title = metadata.listTitle || metadata.resource;
    ui.prepareSearch();
    store.resetList();
    return store
      .init(resource || metadata.resource, module)
      .then(() => BaseList.loadItems(props, sort));
  }

  static loadItems(props, sort) {
    const { ui, module: { name, metadata }, [name]: store, resource } = props;
    return store.fetchList(resource || metadata.resource, ui.searchValue, sort);
  }

  static search(props, sort) {
    const { module: { name }, [name]: store } = props;
    store.resetList();
    BaseList.loadItems(props, sort);
  }

  componentWillMount() {
    // TODO: Make it run 1 time. Now it runs twice in server side rendering.
    BaseList.onEnter(this.props, this.sort);
    this.searchReaction = reaction(
      () => this.props.ui.searchValue,
      () => BaseList.search(this.props, this.sort)
    );
  }

  componentWillUnmount() {
    this.searchReaction();
  }

  getFieldTitle = (store, fieldName) => {
    const { schema, listMeta } = store;
    return (listMeta[fieldName] && listMeta[fieldName].title) ||
      (schema[fieldName] && schema[fieldName].properties &&
      schema[fieldName].properties.title) ||
      fieldName;
  };

  @action
  loadMoreItems = () => {
    BaseList.loadItems(this.props, this.sort);
  };

  @observable sort = {
    fieldName: null,
    sortDirection: null,
  };

  @action sortColumn = (sortFieldName) => {
    const { module: { name }, [name]: store } = this.props;
    const { fieldName, direction } = this.sort;
    store.resetList();
    if (fieldName === null || fieldName !== sortFieldName) {
      this.sort = {
        fieldName: sortFieldName,
        direction: 'asc',
      };
    } else if (direction === 'asc') {
      this.sort.direction = 'desc';
    } else if (direction === 'desc') {
      this.sort = {
        fieldName: null,
        direction: null,
      };
    }
  };

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
    loading: {
      width: '100%',
      textAlign: 'center',
    },
  };

  render() {
    const { module, resource, params } = this.props;
    const { name, metadata, Menu, Form } = module;
    const store = this.props[name];
    const { listMeta, schema } = store;
    const loading = (
      <div style={this.styles.loading}>
        <Loading />
      </div>
    );

    if (!listMeta || !schema) {
      return loading;
    }

    const fieldNames = _.reduce(
      listMeta, (result, value, key) => {
        result.push(key);
        return result;
      },
      []);
    const waypoint = store.hasMoreItems ? <Waypoint onEnter={this.loadMoreItems} /> : null;
    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {fieldNames.map((fieldName) => {
                const sortable = listMeta[fieldName].sortable;
                const sortDirection =
                  this.sort.fieldName === fieldName ? this.sort.direction : null;
                const title = this.getFieldTitle(store, fieldName);
                return (<TableHeaderColumn key={fieldName}>
                  {sortable ?
                    <TableSortLabel
                      name={fieldName} direction={sortDirection}
                      title={title} onClick={this.sortColumn}
                    />
                    : title
                  }
                </TableHeaderColumn>);
              })}
              {Menu && <TableHeaderColumn style={this.styles.actionColumn} />}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {store.list.map((item) => {
              const id = store.getModelId(item);
              return (<TableRow key={id}>
                {fieldNames.map((fieldName) => {
                  const { gettingPipe } = listMeta[fieldName];
                  return (<TableRowColumn key={`${fieldName}_${id}`}>
                    {gettingPipe ? gettingPipe(item[fieldName], item, fieldName) : item[fieldName]}
                  </TableRowColumn>);
                })}
                {
                  Menu &&
                  <TableRowColumn style={this.styles.actionColumn}>
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                      <Menu
                        module={module} id={id} item={item} resource={resource} params={params}
                      />
                    </IconMenu>
                  </TableRowColumn>
                }
              </TableRow>);
            })}
          </TableBody>
        </Table>
        { store.isLoading ? loading : waypoint }
        {
          Form &&
          <Link to={`/${resource || metadata.resource}/create`}>{
            ({ onClick }) =>
              <FloatingActionButton onClick={onClick} style={this.styles.fab}>
                <ContentAdd />
              </FloatingActionButton>
          }</Link>
        }
      </div>
    );
  }
}

export default BaseList;
