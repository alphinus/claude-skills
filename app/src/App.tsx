import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';
import { DashboardPage } from './pages/DashboardPage';
import { CreateBrandPage } from './pages/CreateBrandPage';
import { EditBrandPage } from './pages/EditBrandPage';
import { CollectionPage } from './pages/CollectionPage';
import { BuildPage } from './pages/BuildPage';
import { ComparePage } from './pages/ComparePage';
import { useBrands } from './hooks/useBrands';

export default function App() {
  const { brands, loading, createBrand, updateBrand, deleteBrand, duplicateBrand } = useBrands();

  return (
    <BrowserRouter>
      <ToastProvider>
        <ErrorBoundary>
          <AppShell brands={brands}>
            <Routes>
              <Route path="/" element={<DashboardPage brands={brands} loading={loading} onDuplicate={duplicateBrand} />} />
              <Route path="/brands/new" element={<CreateBrandPage onCreate={createBrand} />} />
              <Route path="/brands/:slug/edit" element={<EditBrandPage onUpdate={updateBrand} onDelete={deleteBrand} onDuplicate={duplicateBrand} />} />
              <Route path="/brands/:slug/collection" element={<CollectionPage />} />
              <Route path="/build" element={<BuildPage brands={brands} />} />
              <Route path="/compare" element={<ComparePage brands={brands} />} />
            </Routes>
          </AppShell>
        </ErrorBoundary>
      </ToastProvider>
    </BrowserRouter>
  );
}
