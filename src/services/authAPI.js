// src/services/authApi.js
const API_BASE_URL = 'https://your-api.com/resume-matcher/v1';

// Helper: Handle API errors consistently
// const handleApiError = async (response) => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(
//       errorData.message || 
//       `HTTP ${response.status}: ${response.statusText}`
//     );
//   }
//   return response.json();
// };

export const login = async (credentials) => {
  try {
  //   const response = await fetch(`${API_BASE_URL}/auth/login`,{
  //     mode:"cors",
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(credentials),
  //     credentials: 'include' // For HTTP-only cookies
  //   });

    //const data = await handleApiError(response);
    const data={
      token: "mock-candidate-token-123",
      id: "user_789",
      email: "candidate@example.com",
      role: "candidate",
      firstName: "Alex",
      lastName: "Johnson",
    };
    if (!data.token) {
      throw new Error('No authentication token received');
    }

    return {
      success: true,
      token:data.token,
      user: {
          id: data.id,
          email: data.email,
          role: credentials.role, // 'candidate' or 'recruiter'
          firstName: data.firstName || '',
          lastName: data.lastName || '',
        }
    };

  } catch (error) {
    console.error('Login failed:', error);
    return {
      success: false,
      message: error.message || 'Login failed. Please try again.'
    };
  }
};

export const signup = async (userData) => {
  try {
    // const response = await fetch(`${API_BASE_URL}/auth/signup`,{
    //   mode:"cors",
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData)
    // });

    const data={
      token: "mock-candidate-token-123",
      id: "user_789",
      email: "candidate@example.com",
      role: "candidate",
      firstName: "Alex",
      lastName: "Johnson",
      company : "Amazon",
    };
    
    return {
      success: true,
      token:data.token,
      user: {
          id: data.id,
          email: data.email,
          role: userData.role, // 'candidate' or 'recruiter'
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          company: data.company || ''
        }
      //requiresVerification: !!data.tempToken // If email verification needed
    };

  } catch (error) {
    console.error('Signup failed:', error);
    return {
      success: false,
      message: error.message.includes('409') 
        ? 'Email already exists' 
        : 'Signup failed. Please try again.'
    };
  }
};

// Optional: Token refresh
// export const refreshToken = async () => {
//   /* ... */
// };