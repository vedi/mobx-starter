import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { IconButton, TextField } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import DebounceInput from 'react-debounce-input';

@inject('ui')
@observer
class SearchField extends React.Component {
  @action onChange = (e) => {
    this.props.ui.searchValue = e.target.value;
  };
  @action onClick = () => {
    this.props.ui.searchOpen = !this.props.ui.searchOpen;
  };
  @action onClear = () => {
    this.props.ui.searchValue = '';
  };
  render() {
    const { searchOpen } = this.props.ui;
    return (
      <div className={`search${searchOpen ? ' open' : ''}`}>
        <IconButton
          onClick={this.onClick}
          iconStyle={{ color: 'white' }}
          style={{ position: 'absolute', left: '-48px' }}
          tooltip={searchOpen ? 'Close Search' : 'Open Search'}
        >
          <SearchIcon />
        </IconButton>
        {searchOpen ?
          <IconButton
            iconStyle={{ color: 'white' }}
            onClick={this.onClear}
            style={{ position: 'absolute', right: '-16px', zIndex: '2' }}
            tooltip="Clear"
          >
            <CloseIcon />
          </IconButton> : null }
        {searchOpen ?
          <DebounceInput
            value={this.props.ui.searchValue}
            minLength={1}
            debounceTimeout={800}
            onChange={this.onChange}
            element={TextField}
            placeholder="Search"
            name="search" type="text" autoFocus
            className="search-input"
            inputStyle={{ color: 'white' }}
            style={{ verticalAlign: 'top', width: '100%' }}
            underlineFocusStyle={{ borderBottomColor: 'white' }}
          /> : null}
      </div>);
  }
}

export default SearchField;
