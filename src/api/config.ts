export const getEndpoints = () => {
  return {
    api: process.env.API_URL || "https://efs-bck.herokuapp.com",
    // web: window.location.href,
  };
};
