const sjn = (processes) => {
    const sortedProcesses = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    let completedProcesses = 0;
    const executionOrder = [];

    while (completedProcesses < sortedProcesses.length) {
        const readyProcesses = sortedProcesses.filter((p) => p.arrivalTime <= currentTime && !p.completed);
        if (readyProcesses.length > 0) {
            const shortestProcess = readyProcesses.reduce((min, p) => p.burstTime < min.burstTime ? p : min);
            const startTime = currentTime;
            const waitingTime = startTime - shortestProcess.arrivalTime;
            currentTime += shortestProcess.burstTime;
            const finishTime = currentTime;
            shortestProcess.completed = true;
            executionOrder.push({ name: shortestProcess.name, startTime, finishTime, waitingTime });
            completedProcesses++;
        } else {
            currentTime = sortedProcesses.find((p) => p.arrivalTime > currentTime)?.arrivalTime || currentTime + 1;
        }
    }

    const averageWaitingTime = executionOrder.reduce((sum, task) => {
        return sum + task.waitingTime;
    }, 0) / sortedProcesses.length;

    return {
        executionOrder,
        averageWaitingTime
    };
};

const processes = [
    { name: 'Task A', arrivalTime: 0, burstTime: 6 },
    { name: 'Task B', arrivalTime: 1, burstTime: 8 },
    { name: 'Task C', arrivalTime: 2, burstTime: 7 },
    { name: 'Task D', arrivalTime: 3, burstTime: 3 },
];

const { executionOrder, averageWaitingTime } = sjn(processes);

console.log('Execution Order:');
executionOrder.forEach(task => {
    console.info(`${task.name} started at ${task.startTime}, finished at ${task.finishTime}, waiting time: ${task.waitingTime}`);
});

console.error('Average Waiting Time:', averageWaitingTime);