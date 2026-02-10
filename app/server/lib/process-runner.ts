import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');

export function runScript(script: string, args: string[] = []): Promise<{ stdout: string; stderr: string; code: number }> {
  const cmd = `${path.join(REPO_ROOT, script)} ${args.join(' ')}`;
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
