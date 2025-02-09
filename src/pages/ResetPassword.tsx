import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/authActions';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/particles/InputField';

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(resetPassword(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/login'); // Redirect to login page after reset
      }
    });
  };

  return (
    <div className="main">
      <div className="login">
        <div className="login-tem">
      <h2>Reset Password</h2>
      <p>Enter the OTP you received and set a new password.</p>

      <form onSubmit={onSubmit}>
        <InputField 
          type="text" 
          name="otp" 
          placeholder="Enter OTP" 
          value={formData.otp} 
          onChange={onChange} 
          required 
        />
        <InputField 
          type="password" 
          name="newPassword" 
          placeholder="New Password" 
          value={formData.newPassword} 
          onChange={onChange} 
          required 
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ResetPassword;
