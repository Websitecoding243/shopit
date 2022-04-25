import axios from 'axios';

export const getCoupons = async () => await axios.get(`/api/v1/coupons`);

export const removeCoupon = async (couponId, token) =>
  await axios.delete(`/api/v1/coupon/${couponId}`, {
    headers: {
      token,
    },
  });

export const createCoupon = async (coupon, token) =>
  await axios.post(
    `/api/v1/coupon`,
    { coupon },
    {
      headers: {
        token,
      },
    }
  );
