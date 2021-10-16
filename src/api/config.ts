export const getEndpoints = () => {
    return {
      api: process.env.API_URL || "http://localhost:8000",
      web: window.location.href,
    };
  };