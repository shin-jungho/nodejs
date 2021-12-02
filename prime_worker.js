const { exit } = require('process');
const { Worker, isMainThread, parentPort, workerData } = require('wo');
const min = 2; 
const max = 10000000;
const primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end ; i++){
    for(let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  console.time('prime');
  for(let i = 0; i < threadCount - 1; i++){
    const wStart = start;
    threads.add(new Worker(__filename, {workerData: {start: wStart, range}}));
    start += range;
  }
  threadCount.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount)}}));
  for (let worker of threads) {
    worker.on(exit)
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}

findPrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);