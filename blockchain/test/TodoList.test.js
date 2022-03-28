const { assert } = require("chai");

const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.todoList.address;

    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("lists tasks", async () => {
    const taskCount = await this.todoList.getOwnerTaskCount();
    assert.equal(taskCount.toNumber(), 0);

    const tasks = await this.todoList.getOwnerTasks();
    assert.isEmpty(tasks);
  });

  it("creates tasks", async () => {
    const result = await this.todoList.createTask("test");
    assert.exists(result);

    const event = result.logs[0];
    assert.equal(event.event, "TaskCreated");

    const taskCount = await this.todoList.getOwnerTaskCount();
    assert.equal(taskCount, 1);

    const tasks = await this.todoList.getOwnerTasks();
    assert.isArray(tasks);

    const task = tasks[0];
    assert.equal(task.id, 0);
    assert.equal(task.content, "test");
    assert.isFalse(task.completed);
  });

  it("toggles task completion", async () => {
    const newTask = await this.todoList.createTask("test");
    assert.exists(newTask);

    const result = await this.todoList.toggleCompleted(0);
    assert.exists(result);

    const event = result.logs[0];
    assert.equal(event.event, "TaskCompleted");

    const task = await this.todoList.tasks(0);
    assert.exists(task);
    assert.isTrue(task.completed);
  });
});
