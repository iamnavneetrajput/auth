import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../features/auth/authActions'; // Import the action
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/particles/InputField';

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(forgotPassword({ email })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/reset-password'); // Redirect to reset password page
      }
    });
  };

  return (
    <div className="main">
      <div className="login">
        <div className="login-tem">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset OTP.</p>

          <form onSubmit={onSubmit}>
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
