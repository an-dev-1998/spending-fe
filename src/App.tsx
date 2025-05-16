import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Spin, App as AntApp } from 'antd';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { initializeAuth } from './utils/api/sanctum';
import './assets/app.css';
import './i18n';

// Lazy load pages
const pages = import.meta.glob('./pages/*.tsx');

// Loading component with Antd Spin
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <Spin tip="Loading...">
  <div style={{ minHeight: 100 }}>
  </div>
</Spin>
  </div>
);

// Generate routes from pages
const routeElements = Object.entries(pages).map(([path, lazyImport]) => {
  const routePath = path
    .replace('./pages/', '/')           
    .replace('.tsx', '')                
    .toLowerCase();

  const Component = lazy(lazyImport as () => Promise<{ default: React.ComponentType }>);

  const isAuthPage = routePath.includes('login') || routePath.includes('register');

  return (
    <Route
      key={routePath}
      path={routePath}
      element={
        <Suspense fallback={<LoadingFallback />}>
          {isAuthPage ? (
            <Component />
          ) : (
            <ProtectedRoute>
              <MainLayout>
                <Component />
              </MainLayout>
            </ProtectedRoute>
          )}
        </Suspense>
      }
    />
  );
});

const App: React.FC = () => {
  // Initialize authentication when the app starts
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <AntApp>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {routeElements}
        </Routes>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
