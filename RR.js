function roundRobin(processes, timeQuantum) {
    let queue = [...processes];
    let currentTime = 0;
    let completedProcesses = [];
    let executionOrder = [];
  
    while (queue.length > 0) {
      const currentProcess = queue.shift();
      const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
      
      currentTime += executionTime;
      currentProcess.remainingTime -= executionTime;
  
      executionOrder.push(currentProcess.id);
  
      if (currentProcess.remainingTime > 0) {
        queue.push(currentProcess);
      } else {
        currentProcess.completionTime = currentTime;
        completedProcesses.push(currentProcess);
      }
    }
  
    return { completedProcesses, executionOrder };
  }
  
  // Example usage
  const processes = [
    { id: 1, arrivalTime: 0, burstTime: 4, remainingTime: 4 },
    { id: 2, arrivalTime: 1, burstTime: 2, remainingTime: 2 },
    { id: 3, arrivalTime: 3, burstTime: 5, remainingTime: 5 },
    { id: 4, arrivalTime: 6, burstTime: 3, remainingTime: 3 }
  ];
  
  const timeQuantum = 2;
  const { completedProcesses, executionOrder } = roundRobin(processes, timeQuantum);
  
  console.log(completedProcesses);
  console.log("Execution Order: " + executionOrder.join(", "));