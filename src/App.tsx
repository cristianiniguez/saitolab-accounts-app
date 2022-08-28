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
          <Route path='/' element={<HomePage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </Router>
    </AppServicesProvider>
  );
}

export default App;
