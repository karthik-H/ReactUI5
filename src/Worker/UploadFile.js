
self.onmessage = (message) => {
    console.log('in worker', message);
}
self.postMessage('from worker');