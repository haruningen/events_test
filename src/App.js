import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { APP_ROUTES } from './utils/constants';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to={APP_ROUTES.HOME} />} />
          <Route path={APP_ROUTES.SIGN_UP} exact element={<SignUp />} />
          <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={APP_ROUTES.HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;