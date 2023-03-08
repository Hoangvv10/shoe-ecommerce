import { faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Cart.module.scss';
import * as actions from '~/store/actions';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Cart() {
    const { cart } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let menuRef = useRef();

    useEffect(() => {
        setOpen(true);
    }, [cart.length]);

    useEffect(() => {
        let handleOpen = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOpen);

        return () => {
            document.removeEventListener('mousedown', handleOpen);
        };
    }, []);

    useEffect(() => {
        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice += item.quantity * item.currentPrice;
        });
        setTotal(Math.floor(totalPrice));
    }, [cart]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('right-item')} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon className={cx('item-icon')} icon={faCartShopping} />
                <span className={cx('item-cart')}>Cart</span>
                {cart.length > 0 && <span className={cx('cart-num')}>{cart.length}</span>}
            </div>
            <div
                className={cx({
                    modal: true,
                    inactive: !open,
                })}
            >
                <div
                    className={cx({
                        'modal-wrapper': true,
                        'show-up': open,
                        exit: !open,
                    })}
                    ref={menuRef}
                >
                    <div className={cx('modal-inner')}>
                        <div className={cx('modal-header')}>Cart</div>
                        <div className={cx('modal-body')}>
                            {cart?.map((item, index) => (
                                <div className={cx('item')} key={index}>
                                    <img src={item?.paths[0]} alt="item-img" className={cx('item-img')} />
                                    <div className={cx('item-info')}>
                                        <div className={cx('item-title')}>
                                            {item?.brand} {item?.title}
                                        </div>
                                        <div className={cx('size')}>
                                            Size:
                                            {item.curSize?.map((item, index) => (
                                                <span key={index}> {item},</span>
                                            ))}
                                        </div>

                                        <div className={cx('bottom')}>
                                            <div className={cx('left')}>
                                                <p>Quantity</p>
                                                <div className={cx('left-btn')}>
                                                    <div
                                                        className={cx('btn')}
                                                        onClick={() => dispatch(actions.decreItem(item.id))}
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </div>
                                                    <div className={cx('btn')}>{item.quantity}</div>
                                                    <div
                                                        className={cx('btn')}
                                                        onClick={() => dispatch(actions.increItem(item.id))}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('right-btn')}>
                                                <div className={cx('item-price')}>
                                                    <span>${item?.currentPrice * item.quantity}</span>
                                                    {item?.isSale === true && (
                                                        <>
                                                            <span className={cx('sale-price')}>
                                                                ${item?.fullPrice * item.quantity}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className={cx('delete')}>
                                                    <p onClick={() => dispatch(actions.deleteItem(item.id))}>Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('total')}>
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <div className={cx('footer-btn')} onClick={() => navigate('/checkout')}>
                            Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
