import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword:''
    }
  }

  onChange=(event)=>{
    let target= event.target;
    let name= target.name;
    let value=target.value;
    this.setState({
      [name]:value
    })
  }

  onSearch=()=>{
    console.log(this.state);
    this.props.onSearch(this.state.keyword);
  }
  render() {
    let {keyword}=this.state;
    return (
      <div>
        <div className="input-group">
          <input 
                name="keyword"
                type="text" 
                className="form-control" 
                placeholder="Nhập từ khóa..." 
                value={keyword}
                onChange={this.onChange}
                />
          <span className="input-group-btn">
                      <button 
                          className="btn btn-primary" 
                          type="button"
                          onClick={this.onSearch}
                          >
                          <span className="fa fa-search mr-5"></span>Tìm
          </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
