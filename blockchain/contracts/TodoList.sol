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

    constructor() {}

    function getOwnerTasks() public view returns (Task[] memory) {
        // Create a copy of the requester's task ID's
        uint[] memory taskIds = ownerTaskIds[msg.sender];

        // Create a new Task[] with a predefined length
        Task[] memory _tasks = new Task[](taskIds.length);

        // Loop through each of the requester's task ID's
        for (uint i = 0; i < taskIds.length; i++) {
            // Assign Task objects to the _tasks array
            _tasks[i] = tasks[taskIds[i]];
        }

        // Return owner's Task objects
        return tasks;
    }

    function getOwnerTaskCount() public view returns (uint) {
        // Return the length of the requester's tasks
        return ownerTaskIds[msg.sender].length;
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

        // Emit Task Created Event
        emit TaskCreated(taskCount, _content, false);

        // Increment Task Count by 1
        // This will also be the next task's ID.
        taskCount++;
    }

    function toggleCompleted(uint256 _id) public {
        // Reference task from storage
        Task storage _task = tasks[_id];

        // Switch completed value
        // Because we specified storage above, the change get's applied to `tasks[_id]`
        _task.completed = !_task.completed;

        // Emit TaskCompleted Event
        emit TaskCompleted(_id, _task.completed);
    }
}
