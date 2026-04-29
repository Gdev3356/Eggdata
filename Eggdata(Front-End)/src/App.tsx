import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Opponents } from './pages/Opponents';
import { Plans } from './pages/Plans';
import { Recruitment } from './pages/Recruitment';

const Placeholder = ({ title }: { title: string }) => (
  <div className="text-gray-500 sonic-ui text-sm italic">SYSTEM FILE "{title}" IS ENCRYPTED. PENDING BACKEND SYNC...</div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="opponents" element={<Opponents/>} />
            <Route path="plans" element={<Plans/>} />

            <Route path="users" element={<Recruitment />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;