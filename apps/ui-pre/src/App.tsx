import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// components
import AppServicesProvider from './components/providers/AppServicesProvider';
import PublicRoute from './components/routes/PublicRoute';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  return (
    <AppServicesProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<HomePage />} path='/' />
            <Route element={<SignInPage />} path='/sign-in' />
            <Route element={<SignUpPage />} path='/sign-up' />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardPage />} path='/dashboard' />
          </Route>
        </Routes>
      </Router>
    </AppServicesProvider>
  );
}

export default App;
