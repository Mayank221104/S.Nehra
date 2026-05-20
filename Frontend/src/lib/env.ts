// Environment variable validation for frontend
const required = [
  "VITE_API_URL",
  // Add more as needed
];

required.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing env: ${key}`);
  }
});

export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
};
