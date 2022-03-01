import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, removeWishlist } from '../../functions/user';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';

import { useAlert } from 'react-alert';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
      alert.success('Product removed from wishlist');
    });

  return (
    <Fragment>
      <MetaData title={'My Wislist'} />
      <div className="col">
        <h3 className="text-center">My Wishlist </h3>

        {wishlist.map((p) => (
          <div key={p._id} className="alert alert-secondary">
            <div>
              {p.name}
              <Link
                to={`/product/${p._id}`}
                className="btn btn-primary py-1 px-2 float-right"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button
                onClick={() => handleRemove(p._id)}
                className="btn btn-danger py-1 px-2 float-right mr-2"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Wishlist;
