import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
import demo from './training/demo';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            displayForm: false,
            taskEditting:null,
            filter:{
               name:'',
               status:-1
           },
           keyword:'',
           sortBy: 'name',
           sortValue:1
           //id, name, status // sao o day ko co s vay em cho tasks = this.state
                // thi thang do phai trung ten voi state thi state phai la tasks chu
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let taskss = JSON.parse(localStorage.getItem('tasks'));
            // get la lay set la cai dat
            //thi nghia la lay du lieu tren localStorage
            this.setState({
                tasks: taskss 
                    
            });
        }
    }

    s4() {
        return Math.floor((1 + Math.random() * 0x10000)).toString(16).substring(1); // random ÍD
    }
    generateID() {
        return this.s4() + this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
    }
    onAddJob = () => { //open form
        if(this.state.displayForm && this.state.taskEditting!==null){ // sua->them
            //console.log('TH1'); 
            this.setState({
                displayForm: true,
                taskEditting: null
            });
        }
        else{ // them ->sua
            //console.log("TH2");
            this.setState({
                displayForm: !this.state.displayForm,
                taskEditting: null
            });
        }
    }

    onClose = () => {
        this.setState({
            displayForm: false
        })
    }

    onShowForm=()=>{
        this.setState({
            displayForm: true
        })
    }

    onSubmit = (data) => {
        var { tasks } = this.state; //tasks=this.state.tasks
        if(data.id===''){ //add
            data.id = this.generateID();
            tasks.push(data);
            
        }else{ //edit
            let index=this.findIndex(data.id);
            tasks[index] =data;
        
        }
        this.setState({
            tasks: tasks,
            taskEditting: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        let {tasks} = this.state;
        let index=this.findIndex(id);
        
        if(index!==-1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex=(id)=>{
        let {tasks}=this.state;
        let result=-1;
        tasks.forEach((task,index)=>{
            if(task.id===id)
                result = index;
        })
        return result;
    }
    onDeleteElm = (id)=>{
        let {tasks} = this.state;
        let index=this.findIndex(id);
        if(index!==-1) {
            tasks.splice(index,1);
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onClose();
    }

    onEditElm = (id)=>{
        let {tasks} = this.state;
        let index=this.findIndex(id);
        let taskEditting=tasks[index];
        this.setState({
            taskEditting:taskEditting
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus)=>{
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSearch = (keyword)=>{
       this.setState({
           keyword:keyword
       });
    }
    onSort=(sortBy, sortValue)=>{
       this.setState({
           sortBy:sortBy,
           sortValue:sortValue
       });
       console.log(this.state)
    }

    render() {
        let { tasks, displayForm, taskEditting, filter,keyword,sortBy,sortValue } = this.state;
        //console.log(filter.name);
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task)=>task.name.toLowerCase().indexOf(filter.name)!==-1);
            }
            tasks = tasks.filter((task)=>{
                if(filter.status===-1) return task;
                else return task.status ===(filter.status ===1? true:false);
            })
        }

        if(sortBy==='name'){
            tasks.sort((a,b)=>{
                if(a.name>b.name) return sortValue;
                if(a.name<b.name)return -sortValue;
                return 0;
            });
        } else{
            tasks.sort((a,b)=>{
                if(a.status>b.status) return -sortValue;
                if(a.status<b.status)return sortValue;
                return 0;
            });
        }
        if(keyword) tasks = tasks.filter((task)=>task.name.toLowerCase().indexOf(keyword)!==-1);        
        const elmDisplayForm = displayForm ?
            <TaskForm 
                onSubmitFormApp = { this.onSubmit }
                onClose = { this.onClose }
                task={taskEditting}
            /> : '';

        
        // this.state = this.state.tasks
        // bien trong render thi phai khai bao ngoac nhon h
        // trong file return chi co JSX thoi
        return (
             <div className = "App" >
                 <div className = "container" >
                    <div className = "text-center" >
                        <h1 > Quản Lý Công Việc </h1> 
                    </div>  
                <div className = "row" >
                    <div className = { this.state.displayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" } > { elmDisplayForm }
                </div> 
                <div className = { this.state.displayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" } >
                    <button 
                    type = "button"
                    className = "btn btn-primary"
                    onClick = { this.onAddJob }
                    >
                        <span className = "fa fa-plus mr-5" > </span>Thêm Công Việc 
                    </button>


                    <div className = "row mt-15" >
                        <Control 
                            onSearch = {this.onSearch}
                            onSort = {this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        <div className = "row mt-15" >
                            <div className = "col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                                <TaskList
                                taskss = { tasks }
                                onUpdate = { this.onUpdateStatus }
                                onDelete= {this.onDeleteElm}
                                onEdit = {this.onEditElm}
                                onFilter = {this.onFilter}
                                />  
                            </div>
                        </div>  
                    </div> 
                </div>
            </div>  
            </div>
            </div>

        );
    }
}

export default App;