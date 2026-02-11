import { exec } from 'child_process';
import path from 'path';
import { REPO_ROOT } from './config.js';

export function runScript(script: string, args: string[] = []): Promise<{ stdout: string; stderr: string; code: number }> {
  const safePath = path.join(REPO_ROOT, script);
  const safeArgs = args.map(a => `'${a.replace(/'/g, "'\\''")}'`).join(' ');
  const cmd = `${safePath} ${safeArgs}`;
  return new Promise((resolve) => {
    exec(cmd, { cwd: REPO_ROOT, timeout: 60000 }, (error, stdout, stderr) => {
      resolve({
        stdout: stdout.toString(),
        stderr: stderr.toString(),
        code: error ? error.code ?? 1 : 0,
      });
    });
  });
}

export { REPO_ROOT };
