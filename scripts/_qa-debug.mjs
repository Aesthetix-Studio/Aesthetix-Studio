import { spawn } from 'node:child_process';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9333;
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${port}`, `--user-data-dir=${process.cwd()}/.qa-debug-profile`,
  'about:blank',
], { stdio: 'ignore' });
console.log('chrome spawned pid', chrome.pid);

for (let i = 0; i < 40; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`);
    const targets = await res.json();
    console.log('CDP up at attempt', i, 'targets:', targets.length);
    if (targets.length) {
      console.log('ws url:', targets[0].webSocketDebuggerUrl);
      const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
      await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = (e) => fail(new Error('ws error ' + (e.message || ''))); });
      console.log('ws connected');
      ws.onmessage = (e) => { console.log('MSG:', e.data.slice(0, 120)); };
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: '1+1', returnByValue: true } }));
      await new Promise((r) => setTimeout(r, 1500));
      chrome.kill();
      process.exit(0);
    }
  } catch (e) {}
  await new Promise((r) => setTimeout(r, 500));
}
console.log('CDP never came up');
chrome.kill();
process.exit(1);
