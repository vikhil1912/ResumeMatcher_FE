import { useEffect, useState } from 'react';
import { loginSchema, signupSchema } from '../utils/validationSchemas';
import { login, signup } from '../services/authAPI';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useAuthForm(role, isLogin) {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  //Should show empty fields and no error flags when logib/signup changes.
  useEffect(()=>{
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      company: '',
      confirmPassword: ''
    });
    setErrors({});
    setApiError('');
    setIsLoading(false);
  },[isLogin,role]);
  
  // Field validation
  const validateField = (name, value) => {
    const schema = isLogin ? loginSchema : signupSchema(role);
    const rules = schema[name];
    
    if (!rules) return '';
    if (rules.required && !value.trim()) return rules.required;
    if (rules.minLength && value.length<rules.minLength.value) return rules.minLength.message;
    if (rules.pattern && !rules.pattern.value.test(value)) return rules.pattern.message;
    if (rules.validate) return rules.validate(value, formData);
    
    return '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    const schema = isLogin ? loginSchema : signupSchema(role);
    
    Object.keys(schema).forEach(key => {
      if (schema[key]) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      const authFunction = isLogin ? login : signup;
      const credentials = { ...formData, role };
      const result = await authFunction(credentials);
      if (!result.success) throw new Error(result.message);

      loginContext({
        token: result.token,
        user: {
          id: result.user.id,
          email: result.user.email,
          role: role, // 'candidate' or 'recruiter'
          firstName: result.user.firstName || '',
          lastName: result.user.lastName || '',
          company: result.user.company || ''
        }
      });
      navigate(role === 'candidate' ? '/candidate' : '/recruiter');      
    } catch (error) {
      setApiError(error.message || (isLogin ? 'Login failed' : 'Signup failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    apiError,
    handleChange,
    handleSubmit
  };
}