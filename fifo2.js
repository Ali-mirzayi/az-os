function fifoScheduler(requests, head) {
    // Check if the range of the numbers is between 0 and 100
    const minValue = Math.min(head, ...requests);
    const maxValue = Math.max(head, ...requests);
    if (minValue < 0 || maxValue > 100) {
        console.error('Error: The range of the numbers in the requests array must be between 0 and 100.');
        return;
    }

    const order = [];
    let currentPosition = head; // Start at the head position
    let totalDistance = 0;

    for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        const distance = Math.abs(request - currentPosition);
        totalDistance += distance;
        order.push(`Moved from cylinder ${currentPosition} to cylinder ${request}`);
        currentPosition = request;
    }

    console.log('Execution order:');
    order.forEach((element, index) => {
        console.log(`Step ${index + 1}: ${element}`);
    });

    console.log(`Total distance traveled: ${totalDistance}`);
}

// Case 1
const head = 0;
const requests = [50, 10, 100];
fifoScheduler(requests, head);
