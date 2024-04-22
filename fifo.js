function createFIFO() {
    const tasks = [];
  

    function addTask(task, duration, arrivalTime) {
        tasks.push({ task, duration, arrivalTime });
        // Sort tasks based on arrival time
        tasks.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }
  
    function processTasks() {
      let currentTime = 0;
      let executionOrder = [];
      while (tasks.length > 0) {
        const currentTask = tasks.shift();
        const startTime = Math.max(currentTime, currentTask.arrivalTime);
        const endTime = startTime + currentTask.duration;
        executionOrder.push(currentTask.task);
        console.log(`Task "${currentTask.task}" started at ${startTime} and ended at ${endTime}`);
        currentTime = endTime;
      }
      console.log("Execution Order: " + executionOrder.join(", "));
    }
  
    return {
      addTask,
      processTasks
    };
  }
  
  // Example usage
  const fifoScheduler = createFIFO();
  
  fifoScheduler.addTask("Task 1", 4, 90);
  fifoScheduler.addTask("Task 2", 2, 1);
  fifoScheduler.addTask("Task 3", 5, 3);
  fifoScheduler.addTask("Task 4", 3, 6);
  
  fifoScheduler.processTasks();