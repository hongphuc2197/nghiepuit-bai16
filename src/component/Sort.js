import React, { Component } from 'react';

class Sort extends Component {
    componentWillReceiveProps=()=>{
         
    }

    onClick=(sortBy, sortValue)=>{
       
       this.props.onSort(sortBy,sortValue);
    }

    render() {
       
        return ( 
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" 
                        type="button" id="dropdownMenu1" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Sắp Xếp <span className="fas fa-caret-square-o-down ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick = {()=>this.onClick('name',1)}>
                        <a  role="button" 
                            href="#\" 
                            className={(this.props.sortBy==='name'&& this.props.sortValue===1)?'sortSelected':''}
                        >
                            <i className="fas fa-sort-alpha-down"></i>
                                Tên A-Z
                        </a>
                    </li>
                    <li onClick = {()=>this.onClick('name',-1)} >
                        <a  role="button" 
                                href="#\" 
                                className={(this.props.sortBy==='name'&& this.props.sortValue===-1)?'sortSelected':''}

                        >
                            <i className="fas fa-sort-alpha-up"></i>
                                Tên Z-A
                        </a>
                    </li>

                    <li role="separator" className="divider"></li>

                    <li onClick = {()=>this.onClick('status',1)}>
                        <a  role="button" 
                                href="#\" 
                                className={(this.props.sortBy==='status'&& this.props.sortValue===1)?'sortSelected':''}

                        >
                            Trạng Thái Kích Hoạt</a>
                    </li>
                    <li onClick = {()=>this.onClick('status',-1)}>
                        <a  role="button" 
                        href="#\" 
                        className={(this.props.sortBy==='status'&& this.props.sortValue===-1)?'sortSelected':''}

                    >
                            Trạng Thái Ẩn</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sort; 