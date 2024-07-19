import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddStuModal} from './AddStuModal';
import {EditStuModal} from './EditStuModal';

export class Student extends Component{

    constructor(props){
        super(props);
        this.state={stus:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://3.144.158.192:8000/student')
        .then(response=>response.json())
        .then(data=>{
            this.setState({stus:data})
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteStu(stuid){
        if(window.confirm('Are you sure?')){
            fetch('http://3.144.158.192:8000/student/'+stuid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {stus, stuid,stuname, depmt, photofilename, doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                <tr>
                            <th>StudentId</th>
                        <th>StudentName</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                </thead>
                <tbody>
                        {this.state.stus.map(stu=>
                            <tr key={stu.StudentId}>
                                <td>{stu.StudentId}</td>
                                <td>{stu.StudentName}</td>
                                <td>{stu.Department}</td>
                                <td>{stu.DateOfJoining}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                stuid:stu.StudentId,stuname:stu.StudentName, 
                                                depmt:stu.Department, doj:stu.DateOfJoining, photofilename:stu.PhotoFileName})}>
                                                    Edit</Button>
                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteDep(stu.StudentId)}>
                                                Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Student</Button>

                    <AddStuModal show={this.state.addModalShow}
                    onHide={addModalClose}/>

                    <EditStuModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            stuid={stuid}
                            stuname={stuname}
                            depmt={depmt}
                            photofilename={photofilename}
                            doj={doj}
                            />
                            
                </ButtonToolbar>
            </div>
        )
    }
}
