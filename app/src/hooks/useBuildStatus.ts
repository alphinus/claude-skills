import { useState } from 'react';

interface BuildResult {
  success: boolean;
  log: string;
  code: number;
}

export function useBuildStatus() {
  const [building, setBuilding] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [log, setLog] = useState<string>('');

  const build = async (slug: string): Promise<BuildResult> => {
    setBuilding(true);
    setLog('');
    try {
      const res = await fetch(`/api/build/${slug}`, { method: 'POST' });
      const data = await res.json();
      setLog(data.log || '');
      return data;
    } finally {
      setBuilding(false);
    }
  };

  const sync = async (slug: string): Promise<BuildResult> => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/build/${slug}/sync`, { method: 'POST' });
      const data = await res.json();
      setLog(prev => prev + '\n--- Sync ---\n' + (data.log || ''));
      return data;
    } finally {
      setSyncing(false);
    }
  };

  const buildAndSync = async (slug: string) => {
    const buildResult = await build(slug);
    if (buildResult.success) {
      return await sync(slug);
    }
    return buildResult;
  };

  return { building, syncing, log, build, sync, buildAndSync };
}
