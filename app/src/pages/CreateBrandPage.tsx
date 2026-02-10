import { useNavigate } from 'react-router-dom';
import { BrandForm } from '../components/brand-form/BrandForm';
import { useToast } from '../components/ui/Toast';
import type { TokensJson } from '../lib/types';

interface CreateBrandPageProps {
  onCreate: (tokens: TokensJson) => Promise<{ slug: string }>;
}

export function CreateBrandPage({ onCreate }: CreateBrandPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (tokens: TokensJson) => {
    try {
      const brand = await onCreate(tokens);
      toast('success', `Brand "${tokens.brand.name}" created`);
      navigate(`/brands/${brand.slug}/edit`);
    } catch (err) {
      toast('error', (err as Error).message);
    }
  };

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>
        <span className="gradient-text">Create New Brand</span>
      </h2>
      <BrandForm onSubmit={handleSubmit} submitLabel="Create Brand" />
    </div>
  );
}
