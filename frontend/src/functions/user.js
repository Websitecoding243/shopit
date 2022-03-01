import axios from 'axios';

export const getWishlist = async (token) =>
  await axios.get(`/api/v1/me/wishlist`, {
    headers: {
      token,
    },
  });

export const removeWishlist = async (productId, token) =>
  await axios.put(
    `/api/v1/me/wishlist/${productId}`,
    {},
    {
      headers: {
        token,
      },
    }
  );

export const addToWishlist = async (productId, token) =>
  await axios.post(
    `/api/v1/me/wishlist`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
