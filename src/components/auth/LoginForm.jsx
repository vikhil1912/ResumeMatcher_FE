export function LoginForm({
  formData,
  errors,
  isLoading,
  apiError,
  handleChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {apiError && (
        <div className="p-3 mb-4 bg-red-100 border-l-4 border-red-500 text-black">
          <p>{apiError}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
            errors.email ? "border-2 border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-black">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-800">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg bg-white/80 text-black placeholder-gray-400 border ${
            errors.password ? "border-2 border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-black">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
