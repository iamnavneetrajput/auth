import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authActions'; // Import the action
import { RootState, AppDispatch } from '../store';
import InputField from '../components/particles/InputField';


const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lastPage } = useSelector((state: RootState) => state.lastPage); // Get last visited page
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate(lastPage || '/', { replace: true }); // Redirect to last visited page
      }
    });
  };

  return (
    <div className="main">
      <div className="login">
        <div className="login-tem">
          <p>Welcome back! Enter your details to login to your account.</p>
          <form onSubmit={onSubmit}>
            <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
            <div className="password-field">
              <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required />
            </div>
            {error && <div className="message">{error}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
            <div className="forget">
            <small><Link to='/forgot-password'>Forgot Password</Link></small>
            </div>
            <p>Or Login with</p>
            <button type="button"><FontAwesomeIcon icon={faGoogle} /> Google</button>
            <button type="button"><FontAwesomeIcon icon={faFacebook} /> Facebook</button>
            <p>Don't have an account? <span className='account'><Link className='account' to='/signup'>Register.</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
