// export const setToken = (token) => {
//     localStorage.setItem('token', token);}

//     // localStorage.setItem(JSON.stringify(res.data.data));}
//   export const getToken = () => localStorage.getItem('token');

//   export const decodeToken = () => {
//     const token = getToken();
//     console.log(token)
//     if (!token) return null;
//     // Extract the payload part of the JWT (the second part when split by '.')
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map((char) => {
//       return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
  
//     return JSON.parse(jsonPayload);
//    };

//   export const removeToken = () => localStorage.removeItem('token');
  
//   export const isLoggedIn=()=>{
//     let data=localStorage.getItem("token");
//     if(data != null)
//         return true;
//     else
//         return false;
   
// };



import api from '../utils/Api'; // Import your API utility

// Set token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
export const getToken = () => localStorage.getItem('token');

//decoding token
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => {
          return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};





// Remove token from localStorage
export const removeToken = () => localStorage.removeItem('token');

// Check if the user is logged in
export const isLoggedIn = () => {
  const token = getToken();
  return token !== null;
};

// Fetch the logged-in user's profile
export const getLoggedInUserProfile = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('No token found. User is not logged in.');
  }

  try {
    const response = await api.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
     // Return the user profile data
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};