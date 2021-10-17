export const getEndpoints = () => {
    return {
      api: process.env.API_URL || "http://localhost:3000",
      // web: window.location.href,
    };
  };