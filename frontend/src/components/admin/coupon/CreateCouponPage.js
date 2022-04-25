import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../../layout/MetaData';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { useAlert } from 'react-alert';
import DatePicker from 'react-datepicker';
import { MDBDataTable } from 'mdbreact';
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState('');
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => setCoupons(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        getCoupons().then((res) => setCoupons(res.data));

        setName('');
        setDiscount('');
        setExpiry('');
        alert.success(`coupon "${res.data.name}" is created`);
      })
      .catch((err) => console.log('create coupon error', err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeCoupon(couponId, user.token).then((res) => {
        getCoupons().then((res) => setCoupons(res.data));
        setLoading(false);
        alert.info(`Coupon "${res.data.name}" is deleted`);
      });
    }
  };

  const alert = useAlert();
  <MetaData title={'Maneg coupons'} />;

  const setAllCoupons = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Discount %',
          field: 'discount',
          sort: 'asc',
        },
        {
          label: 'Expiry',
          field: 'expiry',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    coupons.forEach((coupon) => {
      data.rows.push({
        id: coupon._id,
        name: coupon.name,
        discount: coupon.discount,
        expiry: coupon.expiry,
        actions: (
          <Fragment>
            <button
              onClick={() => handleRemove(coupon._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h3 className="text-danger"> Loading ....</h3>
          ) : (
            <h3 className="text-center"> Create Coupon</h3>
          )}
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">Discount %</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name_field">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
              />
            </div>

            <button
              id="coupon_save_btn"
              type="submit"
              style={{
                backgroundColor: ' #fa9c23',
                borderRadius: '2rem',
                border: 'none',
                color: 'white',
                padding: '0.5rem 2rem',
              }}
            >
              Save
            </button>
          </form>

          <br />

          <h4 className="text-center">{coupons.length} Coupons</h4>

          <MDBDataTable
            data={setAllCoupons()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
