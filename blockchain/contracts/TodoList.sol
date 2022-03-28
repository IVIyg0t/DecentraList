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
    mapping (uint => address) public taskToOwner;
    mapping (address => uint) ownerTaskCount;
    mapping (address => Task[]) ownerTasks;

    constructor() {}

    function getOwnerTasks() public view returns (Task[] memory) {
        return ownerTasks[msg.sender];
    }

    function getOwnerTaskCount() public view returns (uint) {
        return ownerTaskCount[msg.sender];
    }

    function createTask(string memory _content) public {
        uint id = taskCount;

        Task memory _task = Task(id, _content, false);
        tasks.push(_task);

        taskToOwner[id] = msg.sender;
        ownerTaskCount[msg.sender]++;
        ownerTasks[msg.sender].push(_task);

        emit TaskCreated(taskCount, _content, false);
        taskCount++;
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}
