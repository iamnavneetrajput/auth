import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange, required }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name === 'password';

  return (
    <div className="input-field">
      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {isPassword && (
        <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      )}
    </div>
  );
};

export default InputField;
