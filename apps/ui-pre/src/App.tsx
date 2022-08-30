import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// components
import AppServicesProvider from './components/providers/AppServicesProvider';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AppServicesProvider>
      <Router>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<SignInPage />} path='/sign-in' />
          <Route element={<SignUpPage />} path='/sign-up' />
          <Route element={<DashboardPage />} path='/dashboard' />
        </Routes>
      </Router>
    </AppServicesProvider>
  );
}

export default App;
