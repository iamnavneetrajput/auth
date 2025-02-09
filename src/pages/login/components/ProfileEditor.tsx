import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit, FaPlus } from 'react-icons/fa';
import { RootState, AppDispatch } from '../../../store';
import { updateUserInfo } from '../../../features/auth/authActions'; // Action for updating user info

import '../../../assets/css/login.css';

interface Profile {
    name: string;
    bio: string;
    image: string;
}

const ProfileEditor: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<Profile>({
        name: user?.name || '',
        bio: user?.bio || '',
        image: user?.profilePicture || 'https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png',
    });
    const [tempProfile, setTempProfile] = useState<Profile>(profile);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', tempProfile.name);
        formData.append('bio', tempProfile.bio);
        if (tempProfile.image !== profile.image) {
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput?.files?.[0]) {
            formData.append('image', fileInput.files[0]);
          }
        }
      
        try {
          await dispatch(updateUserInfo(formData)).unwrap();
          setIsEditing(false);
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };
      

    const handleCancel = () => {
        setTempProfile(profile);
        setIsEditing(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setTempProfile({ ...tempProfile, image: URL.createObjectURL(file) });
        }
    };

    return (
        <div className="account-profile-section">
            <div className="profile-section-header">
                <h4>{user?.email}</h4>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)}>
                        <FaRegEdit className="icon" />
                    </button>
                )}
            </div>

            <div className="profile-details">
                <div className="profile-picture">
                    <img src={isEditing ? tempProfile.image : profile.image} alt="Profile" />
                    {isEditing && (
                        <label className="camera-btn">
                            <FaPlus className="camera-icon" />
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </label>
                    )}
                </div>

                <div className="profile-info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={tempProfile.name}
                            onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                            placeholder="Enter name"
                        />
                    ) : (
                        <h3>{profile.name}</h3>
                    )}

                    {isEditing ? (
                        <textarea
                            value={tempProfile.bio}
                            onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                            placeholder="Write a bio"
                            maxLength={300} // Limit bio length to 300 characters
                        />
                    ) : (
                        <p>{profile.bio ? profile.bio : 'No bio available'}</p>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ProfileEditor;
