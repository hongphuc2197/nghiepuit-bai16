import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            id:'',
            name: '',
            status: false
        }
    }
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status, 
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            console.log("them->sua")
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status, 
            });
        } else if(!nextProps.task){
            console.log("sua->them")
            this.setState({
                id:'',
                name: '',
                status: false
            });
        }
    }

    onCloseForm=()=>{
        this.props.onClose();
    }
    onNameChange=(event)=>{
        const target = event.target;
        const name = target.name;
        let value = target.value; 
        if(name==="status") {
            value=target.value==="true"? true:false;
        }

        this.setState({
           [name]:value 
        });
    }
    onSubmitForm = (event)=>{
        event.preventDefault();
        this.props.onSubmitFormApp(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear=()=>{
        this.setState({
            name: '',
            status: false
        });
    }



    render() {
     var {id} = this.state;
    return(
   <div>
     <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title" >  { (id!== '')? 'Cập Nhật Công Việc': 'Thêm Công Việc'}</h3> 
                        <i className="fas fa-times close"
                        onClick={this.onCloseForm}
                        ></i>
                        
                    </div>
                    <div className="panel-body">
                        <form onSubmit = {this.onSubmitForm}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name ="name"
                                    value = {this.state.name}
                                    onChange = {this.onNameChange}
                                     />
                            </div>
                            <label>Trạng Thái :</label>
                            <select 
                                className="form-control" 
                                required="required"
                                name="status"
                                value = {this.state.status}
                                onChange = {this.onNameChange}
                                >
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={this.onClear}
                                    >Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
   </div>
  );}
}

export default TaskForm;
