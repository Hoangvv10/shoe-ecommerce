import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as actions from '~/store/actions';
import styles from './Look.module.scss';

const cx = classNames.bind(styles);

function Look({ products, path }) {
    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let menuRef = useRef();

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

    let a;

    [a] = products;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('look-slider')}>
                <img src={path} alt="slider-img" className={cx('look-slider__img')} />
                <div className={cx('slider-btn')} onClick={() => setOpen(true)}>
                    shop the look
                </div>
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
                    })}
                    ref={menuRef}
                >
                    <div className={cx('modal-inner')}>
                        <img src={path} alt="anh-item" className={cx('look-item__img')} />
                        <div className={cx('look-body')}>
                            {products.map((item) => (
                                <div className={cx('look-info')} key={item.id}>
                                    <img src={item?.paths[0]} alt="anh-nho" className={cx('look-body__img')} />
                                    <div className={cx('descript')}>
                                        <div className={cx('look-title')}>
                                            {item.brand} {item.title}
                                        </div>
                                        <div className={cx('look-subtitle')}>{item?.subCategory[0]}</div>
                                        <div className={cx('look-price')}>${item.currentPrice}</div>
                                        <select
                                            name="size"
                                            className={cx('select-input')}
                                            onChange={(e) => {
                                                setSelectValue(e.target.value);
                                            }}
                                        >
                                            <option value="" className={cx('select-options')}>
                                                Select Size
                                            </option>
                                            {item.size.map((item, index) => (
                                                <option value={item} key={index} className={cx('select-options')}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectValue != '' && (
                            <div
                                className={cx('look-btn')}
                                onClick={() =>
                                    dispatch(
                                        actions.setCart({
                                            item: a,
                                            size: selectValue,
                                        }),
                                    )
                                }
                            >
                                <p className={cx('btn-text')}>add to bag</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Look;
