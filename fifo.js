function FIFO() {
  const tasks = [];
  let totalWaitingTime = 0;
  let taskCount = 0;

  function addTask(task, duration, arrivalTime) {
      tasks.push({ task, duration, arrivalTime });
      // Sort tasks based on arrival time
      tasks.sort((a, b) => a.arrivalTime - b.arrivalTime);
  }

function processTasks() {
    let currentTime = 0;
    let executionOrder = [];
    const turnAroundTimes = [];

    while (tasks.length > 0) {
        const currentTask = tasks.shift();
        const startTime = Math.max(currentTime, currentTask.arrivalTime);
        const waitingTime = startTime - currentTask.arrivalTime;
        const endTime = startTime + currentTask.duration;
        const turnAroundTime = endTime - currentTask.arrivalTime;
        executionOrder.push(currentTask.task);
        turnAroundTimes.push(turnAroundTime);
        console.log(`Task "${currentTask.task}" started at ${startTime} and ended at ${endTime}. Waiting time: ${waitingTime}, Turn-around time: ${turnAroundTime}`);
        totalWaitingTime += waitingTime;
        taskCount++;
        currentTime = endTime;
    }

    console.log("Execution Order: " + executionOrder.join(", "));
    console.log("Average Waiting Time: " + (totalWaitingTime / taskCount).toFixed(2));
    console.log("Average Turn-around Time: " + (turnAroundTimes.reduce((sum, time) => sum + time, 0) / taskCount).toFixed(2));
}

  return {
      addTask,
      processTasks
  };
}

// Test case 1: Tasks with different arrival times
const fifoScheduler1 = FIFO();
fifoScheduler1.addTask("Task 1", 4, 1);
fifoScheduler1.addTask("Task 2", 2, 3);
fifoScheduler1.addTask("Task 3", 3, 5);
fifoScheduler1.addTask("Task 4", 5, 7);
fifoScheduler1.processTasks();
console.log();

// Test case 2: Tasks with the same arrival time
const fifoScheduler2 = FIFO();
fifoScheduler2.addTask("Task 1", 4, 1);
fifoScheduler2.addTask("Task 2", 2, 1);
fifoScheduler2.addTask("Task 3", 3, 1);
fifoScheduler2.addTask("Task 4", 5, 1);
fifoScheduler2.processTasks();
console.log();

// Test case 3: Tasks with different durations and arrival times
const fifoScheduler3 = FIFO();
fifoScheduler3.addTask("Task 1", 2, 1);
fifoScheduler3.addTask("Task 2", 5, 3);
fifoScheduler3.addTask("Task 3", 3, 5);
fifoScheduler3.addTask("Task 4", 4, 7);
fifoScheduler3.processTasks();