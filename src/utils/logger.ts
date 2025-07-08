export function log(...args: any[]) {
  console.log('[ZYPHER]:', ...args);
}

export function error(...args: any[]) {
  console.error('[ZYPHER]: ❌', ...args);
}
