import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, verifyOtp } from '../features/auth/authActions'; // Import actions
import { RootState, AppDispatch } from '../store';
import InputField from '../components/particles/InputField';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Use Redux to get lastPage
  const previousPage = useSelector((state: RootState) => state.lastPage.lastPage);

  const [step, setStep] = useState<'signup' | 'otp'>('signup'); // Step tracking
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setStep('otp'); // Move to OTP verification step
      }
    });
  };

  const onOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(verifyOtp({ otp })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate(previousPage); // Redirect to where the user came from after OTP verification
      }
    });
  };

  return (
    <div className="main">
      <div className="login">
        <div className="login-tem">
          {step === 'signup' ? (
            <>
              <p>Create an account by entering your details below.</p>
              <form onSubmit={onSignupSubmit}>
                <InputField type="text" name="name" placeholder="Name" value={formData.name} onChange={onChange} required />
                <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
                <div className="password-field">
                  <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required />
                </div>
                {error && <div className="message">{error}</div>}

                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : 'Sign Up'}
                </button>
              </form>
              <p>Or Login with</p>
                <button type="button"><FontAwesomeIcon icon={faGoogle} /> Google</button>
                <button type="button"><FontAwesomeIcon icon={faFacebook} /> Facebook</button>
                <p>Already have an account? <Link className='account' to="/login">Login</Link></p>
            </>
          ) : (
            <>
              <h2>Enter OTP</h2>
              <p>A verification code has been sent to your email.</p>
              <form onSubmit={onOtpSubmit}>
                <InputField type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                {error && <div className="message">{error}</div>}

                <button type="submit" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
