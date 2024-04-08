export const login = async (value) => {
  return await fetch(`${import.meta.env.VITE_APP_API}/users/login.php`, {
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const register = async (value) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/users/register.php`,
    {
      method: "POST",
      body: JSON.stringify(value),
    }
  );
};

export const currentUser = async (token) => {
  return await fetch(
    `${import.meta.env.VITE_APP_API}/users/current-user.php`,
    {
      method: "POST",
      body: JSON.stringify({ token: token }),
    }
  );
};

