import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-downward';

class TableSortLabel extends React.Component {

  onClick = () => this.props.onClick(this.props.name);

  render() {
    return (
      <span className={`sort-label ${this.props.direction === null ? '' : 'active'}`}>
        <IconButton
          className={`sort-icon ${this.props.direction || ''}`}
          iconStyle={{
            width: '16px',
            height: '16px',
          }}
          style={{
            verticalAlign: 'middle',
            width: '30px',
            height: '30px',
            padding: '0',
            marginTop: '-3px',
          }}
          onClick={this.onClick}
        >
          <ArrowIcon />
        </IconButton>
        <button className="search-label" onClick={this.onClick}>
          {this.props.title}
        </button>
      </span>
    );
  }
}

export default TableSortLabel;
