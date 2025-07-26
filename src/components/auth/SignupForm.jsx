export function SignupForm({ role, formData, errors, handleChange, onSubmit, apiError, isLoading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {apiError && (
        <div className="p-3 mb-4 bg-red-100 border-l-4 border-red-500 text-black">
          <p>{apiError}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
              errors.firstName ? 'border-2 border-red-500' : 'border-gray-300'
            }`}
            placeholder="John"
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-black">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
              errors.lastName ? 'border-2 border-red-500' : 'border-gray-300'
            }`}
            placeholder="Doe"
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-black">{errors.lastName}</p>
          )}
        </div>
      </div>

      {role === 'recruiter' && (
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">Company</label>
          <input
            name="company"
            value={formData.company}
            className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
              errors.company ? 'border-2 border-red-500' : 'border-gray-300'
            }`}
            placeholder="Company name"
            onChange={handleChange}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-black">{errors.company}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
            errors.email ? 'border-2 border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-black">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
            errors.password ? 'border-2 border-red-500' : 'border-gray-300'
          }`}
          placeholder="Create a password"
          onChange={handleChange}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-black">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Must include uppercase, lowercase, and number
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
            errors.confirmPassword ? 'border-2 border-red-500' : 'border-gray-300'
          }`}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-black">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}
