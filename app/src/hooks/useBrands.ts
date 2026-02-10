import { useState, useEffect, useCallback } from 'react';
import type { Brand, TokensJson } from '../lib/types';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/brands');
      if (!res.ok) throw new Error('Failed to fetch brands');
      const data = await res.json();
      setBrands(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBrands(); }, [fetchBrands]);

  const createBrand = async (tokens: TokensJson) => {
    const res = await fetch('/api/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokens),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create brand');
    }
    const brand = await res.json();
    await fetchBrands();
    return brand;
  };

  const updateBrand = async (slug: string, tokens: TokensJson) => {
    const res = await fetch(`/api/brands/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokens),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to update brand');
    }
    const brand = await res.json();
    await fetchBrands();
    return brand;
  };

  const deleteBrand = async (slug: string) => {
    const res = await fetch(`/api/brands/${slug}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete brand');
    await fetchBrands();
  };

  const duplicateBrand = async (slug: string, newName?: string) => {
    const res = await fetch(`/api/brands/${slug}/duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to duplicate brand');
    }
    const brand = await res.json();
    await fetchBrands();
    return brand;
  };

  return { brands, loading, error, fetchBrands, createBrand, updateBrand, deleteBrand, duplicateBrand };
}

export function useBrand(slug: string | undefined) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    setLoading(true);
    fetch(`/api/brands/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setBrand(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  return { brand, loading };
}
