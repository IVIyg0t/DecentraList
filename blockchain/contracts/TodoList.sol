// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract TodoList {
    
    event TaskCreated(uint256 id, string content, bool completed);
    event TaskCompleted(uint256 id, bool completed);

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    uint256 public taskCount = 0;

    Task[] public tasks;
    mapping (uint => address) taskToOwner;
    mapping (address => uint[]) ownerTaskIds;

    // REMOVE
    // mapping (address => uint) ownerTaskCount;
    // mapping (address => Task[]) ownerTasks;

    constructor() {}

    function getOwnerTasks() public view returns (Task[] memory) {
        uint[] memory taskIds = ownerTaskIds[msg.sender];
        Task[] memory _tasks = new Task[](taskIds.length);

        for (uint i = 0; i < taskIds.length; i++) {
            _tasks[i] = tasks[taskIds[i]];
            // _tasks.push(tasks[taskIds[i]]);
        }
        return tasks;
        // return ownerTasks[msg.sender];
    }

    function getOwnerTaskCount() public view returns (uint) {
        return ownerTaskIds[msg.sender].length;
        // return ownerTaskCount[msg.sender];
    }

    function createTask(string memory _content) public {
        // Set id to current taskCount
        uint id = taskCount;

        // Create new task
        Task memory _task = Task(id, _content, false);

        // Add task object to tasks array
        tasks.push(_task);

        // Add task id to ownerTaskIds
        ownerTaskIds[msg.sender].push(id);

        // Task storage task = tasks[id];
        // taskToOwner[id] = msg.sender;
        // ownerTaskIds.push(id);

        // REMOVE
        // ownerTasks[msg.sender].push(task);

        // taskToOwner[id] = msg.sender;
        // ownerTaskCount[msg.sender]++;
        // ownerTasks[msg.sender].push(_task);

        emit TaskCreated(taskCount, _content, false);
        taskCount++;
    }

    function toggleCompleted(uint256 _id) public {
        Task storage _task = tasks[_id];
        _task.completed = !_task.completed;
        // Task memory _task = tasks[_id];
        // _task.completed = !_task.completed;
        // tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}
