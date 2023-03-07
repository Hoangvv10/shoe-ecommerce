import styles from './Checkout.module.scss';

import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Checkout() {
    const [province, setProvince] = useState([]);
    const [currentProvince, setCurrentProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [currentDistrict, setCurrentDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        axios
            .get('https://vapi.vnappmob.com/api/province/')
            .then((res) => {
                setProvince(res.data.results);
            })
            .catch((error) => {
                return error;
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://vapi.vnappmob.com/api/province/district/${currentProvince[0]?.province_id}`)
            .then((res) => {
                setDistrict(res.data.results);
            })
            .catch((error) => {
                return error;
            });
    }, [currentProvince]);

    useEffect(() => {
        axios
            .get(`https://vapi.vnappmob.com/api/province/ward/${currentDistrict[0]?.district_id}`)
            .then((res) => {
                setWard(res.data.results);
            })
            .catch((error) => {
                return error;
            });
    }, [currentDistrict]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img
                        src="https://bizweb.dktcdn.net/100/140/774/themes/827866/assets/logo.png?1677523081625"
                        alt="logo-img"
                        className={cx('logo-img')}
                        onClick={() => navigate('/')}
                    />
                </div>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <div className={cx('header')}>Thông tin giao hàng</div>
                        <div className={cx('form')}>
                            <div className={cx('name')}>
                                <input type="text" placeholder="Tên" className={cx('name-input')} />
                                <input type="text" placeholder="Tên" className={cx('name-input')} />
                                <label className={cx('name-message')}>Vui lòng điền đầy đủ Họ và Tên</label>
                            </div>
                            <div className={cx('address')}>
                                <input type="number" placeholder="Số điện thoại" className={cx('address-input')} />
                                <label className={cx('name-message')}>Vui lòng nhập số điện thoại</label>
                                <input type="text" placeholder="Địa chỉ chi tiết" className={cx('address-input')} />
                                <label className={cx('name-message')}>Ví dụ: Số 7 Thiền Quang,...</label>
                            </div>
                            <div className={cx('city')}>
                                <select
                                    className={cx('name-input')}
                                    onChange={(e) =>
                                        setCurrentProvince(
                                            province.filter((item) => item.province_name === e.target.value),
                                        )
                                    }
                                >
                                    <option value="default">---Chọn tỉnh thành---</option>
                                    {province.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {item.province_name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className={cx('name-input')}
                                    onChange={(e) =>
                                        setCurrentDistrict(
                                            district.filter((item) => item.district_name === e.target.value),
                                        )
                                    }
                                >
                                    <option value="default">---Chọn huyện, thành phố---</option>
                                    {district.map((item) => (
                                        <option value={item.district_name} key={item.id}>
                                            {item.district_name}
                                        </option>
                                    ))}
                                </select>
                                <select className={cx('name-input')}>
                                    <option value="default">---Chọn phường, xã---</option>
                                    {ward.map((item) => (
                                        <option value={item.ward_name} key={item.id}>
                                            {item.ward_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('header')}>Đơn hàng</div>
                        <div className={cx('cart')}>
                            {cart.map((item, index) => (
                                <div className={cx('item')} key={index}>
                                    <img src={item?.paths[0]} alt="item-img" className={cx('item-img')} />
                                    <div className={cx('item-info')}>
                                        <div className={cx('item-title')}>
                                            {item.brand} {item.title}
                                        </div>
                                        <div className={cx('size')}>Size: 3</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('total')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
