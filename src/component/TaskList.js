import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    // onUpdate(){
    //     this.props.task;
    // }
    constructor(props){
        super(props);
        this.state = {
            filterName:'',
            filterStatus: -1
        }
    }

    onChangeFilter =(event)=>{
        let target = event.target;
        let name = target.name;
        let value=target.value;
        this.props.onFilter(
            name ==='filterName'? value: this.state.filterName,
            name ==='filterStatus'? value: this.state.filterStatus
        );       
        this.setState({
            [name]: value
        });
    }

    render() {
        let { taskss } = this.props;
        let {filterName,filterStatus}= this.state;
        let elmTask = taskss.map((task, index) => { //ctr thi ko de trong { } ha anh
            return <TaskItem
                key = { task.id }
                index = { index }
                task = { task }
                onUpdate = { this.props.onUpdate }
                onDelete = {this.props.onDelete}
                onEdit = {this.props.onEdit}
            />; 
            //map la gì kiểu như for truy cập 1 mảng 
            //nghia la tasks co 3 thang thi moi thang task tuong ung voi 1 task
        });
        return (
        <table className = "table table-bordered table-hover" >
            <thead>
                <tr>
                    <th className = "text-center" > STT </th> 
                    <th className = "text-center" > Tên </th> 
                    <th className = "text-center" > Trạng Thái </th> 
                    <th className = "text-center" > Hành Động </th> 
                </tr> 
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td>
                    <input 
                        type="text" 
                        className="form-control"
                        name="filterName"
                        value={filterName}
                        onChange = {this.onChangeFilter}
                    />
                </td>
                <td>
                    <select 
                        className="form-control"
                        name="filterStatus"
                        value={filterStatus} 
                        onChange = {this.onChangeFilter}   
                    >
                        <option value="-1">Tất Cả</option>
                        <option value="0">Ẩn</option>
                        <option value="1">Kích Hoạt</option>
                    </select>
                </td>
                <td></td>
            </tr>
            </tbody>
            <tbody > 
                { elmTask } 
            </tbody> 
        </table> 
           
        );
    }
}

export default TaskList;