import { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { useAuthForm } from '../hooks/useAuthForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate} from 'react-router-dom';

export function AuthPage() {
  const [searchParams,setSearchParams] = useSearchParams();
  const role = searchParams.get('role') || 'candidate';
  const [activeTab, setActiveTab] = useState('login');
  const {user} = useAuth();
  const navigate = useNavigate();
  
  const {
    formData,
    errors,
    isLoading,
    apiError,
    handleChange,
    handleSubmit
  } = useAuthForm(role, activeTab === 'login');

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`, { replace: true });
    }
  }, [user,navigate]);

  useEffect(() => {
    document.title = "Login|Resume Matcher";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center border-b border-white/20">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Resume Matcher</h1>
          <p className="text-sm text-white mt-1">
            {role === 'candidate' ? 'Candidate' : 'Recruiter'} Account
          </p>
          <button 
            onClick={()=>{setSearchParams({role : (role=='candidate')?'recruiter':'candidate'})}}
            className="text-xs text-white mt-4 underline hover:text-white/90 transition"
          >
            Switch to {role === 'candidate' ? 'Recruiter' : 'Candidate'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/20">
          <button
            className={`flex-1 py-3 text-sm font-medium transition ${
              activeTab === 'login' 
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition ${
              activeTab === 'signup' 
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          {activeTab === 'login' ? (
            <LoginForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              apiError={apiError}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              role={role}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              apiError={apiError}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
