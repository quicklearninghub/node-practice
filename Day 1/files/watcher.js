/*
Visualising Node  event loop

To run the program, Node does the following.

1. It loads the script, running all the way through to the 
 last line, which produces the Now watching message in the console.

2. It sees that there’s more to do, because of the call to watch().

3. It waits for something to happen, namely for the fs module to 
    observe a change to the file.

4. It executes our callback function when the change is detected.

5. It determines that the program still has not finished, and resumes waiting.

*/

/**
* Watching files for modifications
*/
const fs = require('fs'); 
fs.watch('points.txt', 
	(event)=> { 
		console.log(`File 'points.txt' just changed! with event- ${event}`);
	 }); 

console.log("Now watching target.txt for changes...");
