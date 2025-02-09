import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchUser } from '../../../features/auth/authActions';

const User: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='main'>
      <p>Welcome, {user.name}</p>
      <p>{user.email}</p>
      <p>{user.id}</p>
      <p>{user.timestamps}</p>
    </div>
  );
};

export default User;