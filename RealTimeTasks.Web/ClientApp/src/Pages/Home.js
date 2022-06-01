
import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../AuthContext';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import TaskRow from '../components/TaskRow';

const Home = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const {user} = useAuthContext();
    const connectionRef = useRef(null);

    useEffect(()=>{
        getTasks();
    }, []);

    useEffect(()=> {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/chat").build();
            await connection.start();
            connectionRef.current = connection;
            connection.on("newTask", taskList => {
                setTasks(taskList);
            });
            connection.on("statusChanged", taskList => {
                setTasks(taskList);
            });
        }
        connectToHub();
    }, []);

    const addTask = async () => {
        await axios.post('/api/tasks/addtask', {title: taskTitle, userId: user.id});
        const connection = connectionRef.current;
        connection.invoke('newTask');
        setTaskTitle('');
    };
     
    const getTasks = async () => {
        const {data} = await axios.get('/api/tasks/gettasks');
        setTasks(data);
    };

    const imDoing = async task => {
        const taskItem = { ...task, status: 1, userId: user.id };
        await axios.post('/api/tasks/changestatus', taskItem);
        const connection = connectionRef.current;
        connection.invoke('statusChanged');
    };

    const done = async task => {
        const taskItem = {...task, status: 2};
        console.log(taskItem)
        await axios.post('/api/tasks/changestatus', taskItem);
        const connection = connectionRef.current;
        connection.invoke('statuschanged');
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-10'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Task Title'
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                    />

                </div>
                <div className='col-md-2'>
                    <button className='btn btn-primary btn-block' onClick={addTask}>Add Task</button>
                </div>
            </div>
            <table className="table table-hover table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t => <TaskRow
                        key={t.id}
                        task={t}
                        imDoing={()=> imDoing(t)}
                        doneClick={()=> done(t)}
                        />
                        
                    )}
                </tbody>
            </table>
            
        </>
    )
}
export default Home;