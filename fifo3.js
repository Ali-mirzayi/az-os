function fifoScheduler(requests,head) {
    // Check if the range of the numbers is between 0 and 100
    if(head) requests.unshift(head) // check if head exists push in requests
    const minValue = Math.min(...requests);
    const maxValue = Math.max(...requests);
    if (minValue < 0 || maxValue > 100) {
      console.error('Error: The range of the numbers in the requests array must be between 0 and 100.');
      return;
    }
  
    const order = [];
    let currentPosition = requests[0]; // Start at the first requested cylinder
    let totalDistance = 0;
  
    for (let i = 1; i < requests.length; i++) {
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
  const head = 5;
  const requests = [10, 40, 100];
  fifoScheduler(requests,head);
