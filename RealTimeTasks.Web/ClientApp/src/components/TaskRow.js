import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../AuthContext';

const TaskRow = ({task, imDoing, doneClick}) => {

    const {title, status, userId} = task;
    const [userDoingTask, setUserDoingTask] = useState({});
    const {user} = useAuthContext();

    useEffect(()=>{
        const getUserById = async () => {
            const {data} = await axios.get(`/api/tasks/getuserbyid?id=${userId}`);
            setUserDoingTask(data);
        };
        getUserById();
    },  []);

    const isAvailable = status === 0;
    const IAmDoingIt = status === 1 && userId === user.id;
    const someoneElseIsDoing =  status === 1 && userId !== user.id;

    return(
        <tr>
            <td>{title}</td>
            <td>
                {isAvailable && <button className='btn btn-info btn-block' onClick={imDoing}>Im doing this one!</button>}
                {someoneElseIsDoing && 
                    <button className='btn btn-warning btn-block' disabled>
                        {userDoingTask.firstName} {userDoingTask.lastName} is doing this
                    </button>}
                {IAmDoingIt && <button className='btn btn-success btn-block' onClick={DdneClick}>I'm done!</button>}
            </td>
        </tr>

    )
}
export default TaskRow;