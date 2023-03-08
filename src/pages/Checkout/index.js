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
    const [total, setTotal] = useState();
    const [quantity, setQuantity] = useState();

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        number: '',
        address: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        let quantity = 0;
        let totalPrice = 0;
        cart.forEach((item) => {
            quantity += item.quantity;
            totalPrice += item.quantity * item.currentPrice;
        });
        setTotal(Math.floor(totalPrice));
        setQuantity(quantity);
    }, [cart]);

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

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setIsSubmit(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
    };

    const validate = (values) => {
        const error = {};
        const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        if (!values.fisrtName && !values.lastName) {
            error.firstName = 'Bạn không được để trống trường này';
        }
        if (!values.number) {
            error.number = 'Bạn không được để trống trường này';
        } else if (!regex.test(values.number)) {
            error.number = 'Số điện thoại không hợp lệ';
        }
        if (!values.address) {
            error.address = 'Bạn không được để trống trường này';
        }

        return error;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, []);

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
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <div className={cx('name')}>
                                <input
                                    type="text"
                                    placeholder="Họ"
                                    name="firstName"
                                    className={cx('name-input')}
                                    value={formValues.firstName}
                                    onChange={handleInput}
                                />
                                <input
                                    type="text"
                                    placeholder="Tên"
                                    name="lastName"
                                    className={cx('name-input')}
                                    value={formValues.lastName}
                                    onChange={handleInput}
                                />
                                <label
                                    className={cx({
                                        'name-message': true,
                                        'error-message': !(formErrors.firstName === undefined),
                                    })}
                                >
                                    {formErrors.firstName === undefined
                                        ? 'Vui lòng điền đầy đủ Họ và Tên'
                                        : formErrors.firstName}
                                </label>
                            </div>
                            <div className={cx('address')}>
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Số điện thoại"
                                    className={cx('address-input')}
                                    value={formValues.number}
                                    onChange={handleInput}
                                />
                                <label
                                    className={cx({
                                        'name-message': true,
                                        'error-message': !(formErrors.number === undefined),
                                    })}
                                >
                                    {formErrors.number === undefined
                                        ? 'Vui lòng nhập số điện thoại'
                                        : formErrors.number}
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Địa chỉ chi tiết"
                                    className={cx('address-input')}
                                    value={formValues.address}
                                    onChange={handleInput}
                                />
                                <label
                                    className={cx({
                                        'name-message': true,
                                        'error-message': !(formErrors.address === undefined),
                                    })}
                                >
                                    {formErrors.address === undefined
                                        ? 'Ví dụ: Số 7 Thiền Quang,...'
                                        : formErrors.address}
                                </label>
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
                                    {province.map((item, index) => (
                                        <option value={item.id} key={index}>
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
                            <div className={cx('submit')}>
                                <input type="submit" value="Xác nhận" className={cx('submit-input')} />
                            </div>
                        </form>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('header')}>Đơn hàng ({quantity})</div>
                        <div className={cx('cart')}>
                            {cart.map((item) => (
                                <div className={cx('item')} key={item.id}>
                                    <img src={item?.paths[0]} alt="item-img" className={cx('item-img')} />
                                    <div className={cx('item-info')}>
                                        <div className={cx('item-title')}>
                                            {item.brand} {item.title}
                                        </div>
                                        <div className={cx('size')}>
                                            Size:
                                            {item.curSize?.map((item, index) => (
                                                <span key={index}> {item},</span>
                                            ))}
                                        </div>
                                        <div className={cx('quantity')}>Số lượng: {item.quantity}</div>
                                        <div className={cx('price')}>
                                            Thành tiền: ${item.quantity * item.currentPrice}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('total')}>
                            <span>Tổng cộng:</span>
                            <span>${total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
