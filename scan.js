function scanElevator(head, requests) {
    let totalDistance = 0;
    let currentPosition = head !== undefined ? head : requests[0];
  
    const minValue = Math.min(...requests);
    const maxValue = Math.max(...requests);
    if (minValue < 0 || maxValue > 100) {
      console.error('Error: The range of the numbers in the requests array must be between 0 and 100.');
      return;
    }
  
    // Sort the requests in ascending order
    requests.sort((a, b) => a - b);
  
    console.log("Execution order:");
  
    for (let i = 0; i < requests.length; i++) {
      let nearestRequest = null;
      let nearestDistance = Infinity;
  
      // Find the nearest request from the current position
      for (let j = 0; j < requests.length; j++) {
        if (requests[j] !== null) {
          const distance = Math.abs(currentPosition - requests[j]);
          if (distance < nearestDistance) {
            nearestRequest = requests[j];
            nearestDistance = distance;
          }
        }
      }
  
      // If the current position is one of the requests, skip it
      if (currentPosition === nearestRequest) {
        console.log(`Step ${i + 1}: Skipped cylinder ${currentPosition}`);
        requests[requests.indexOf(nearestRequest)] = null;
        continue;
      }
  
      console.log(`Step ${i + 1}: Moved from cylinder ${currentPosition} to cylinder ${nearestRequest}`);
      totalDistance += nearestDistance;
      currentPosition = nearestRequest;
  
      // Mark the visited request as null to avoid revisiting it
      requests[requests.indexOf(nearestRequest)] = null;
    }
  
    console.log(`Total distance traveled: ${totalDistance}`);
  }
  
  // Example usage
  const head = undefined;
  const requests = [10,5, 40, 50, 36, 270, 100];
  scanElevator(head, requests);