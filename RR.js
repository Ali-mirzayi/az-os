function roundRobin(processes, timeQuantum) {
  let queue = [...processes];
  let currentTime = 0;
  let completedProcesses = [];
  let executionOrder = [];
  let totalWaitingTime = 0;

  while (queue.length > 0) {
      const currentProcess = queue.shift();
      const executionTime = Math.min(timeQuantum, currentProcess.burstTime);

      currentTime += executionTime;
      currentProcess.burstTime -= executionTime;

      if (currentProcess.burstTime === 0) {
          currentProcess.completionTime = currentTime;
          currentProcess.startTime = currentTime - executionTime;
          currentProcess.waitingTime = currentProcess.startTime - currentProcess.arrivalTime;
          totalWaitingTime += currentProcess.waitingTime;
          completedProcesses.push(currentProcess);
      } else {
          queue.push(currentProcess);
      }

      executionOrder.push({ name: currentProcess.name, startTime: currentTime - executionTime, finishTime: currentTime });
  }

  const averageWaitingTime = totalWaitingTime / completedProcesses.length;

  return { completedProcesses, executionOrder, averageWaitingTime };
}

// Example usage
const processes = [
  { name: 'Task A', arrivalTime: 0, burstTime: 4 },
  { name: 'Task B', arrivalTime: 1, burstTime: 2 },
  { name: 'Task C', arrivalTime: 3, burstTime: 5 },
  { name: 'Task D', arrivalTime: 6, burstTime: 3 }
];

const timeQuantum = 1;
const { completedProcesses, executionOrder, averageWaitingTime } = roundRobin(processes, timeQuantum);

console.log();
console.log('Completed Processes:');
completedProcesses.forEach(process => {
  console.log(`${process.name} started at ${process.startTime}, finished at ${process.completionTime}, waiting time: ${process.waitingTime}`);
});
console.log();


console.log('\nExecution Order:');
executionOrder.forEach(task => {
  console.log(`${task.name} started at ${task.startTime}, finished at ${task.finishTime}`);
});

console.log();
console.log('\nAverage Waiting Time:', averageWaitingTime);