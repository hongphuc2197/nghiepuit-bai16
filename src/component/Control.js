import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
  render() {
    return (
    <div>
      {/* // search */}
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <Search
            onSearch={this.props.onSearch}
          />
      </div>


      {/* // sort */}
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Sort
        onSort={this.props.onSort}
        sortBy = {this.props.sortBy}
        sortValue={this.props.sortValue}
        />
      </div>
    </div>
    );
  }
}

export default Control;
