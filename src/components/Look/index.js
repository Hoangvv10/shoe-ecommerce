import classNames from 'classnames/bind';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useDispatch } from 'react-redux';

import * as actions from '~/store/actions';
import styles from './Look.module.scss';

const cx = classNames.bind(styles);

function Look({ products, path }) {
    const [showSubTab, setShowSubTab] = useState(false);
    const [selectValue, setSelectValue] = useState(false);

    const dispatch = useDispatch();

    let a;

    [a] = products;

    return (
        <>
            <Tippy
                // animation="fade"
                visible={showSubTab}
                interactive
                render={(attrs) => (
                    <div className={cx('look-item')} tabIndex="-1" {...attrs}>
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
                                                e.target.value === '' ? setSelectValue(false) : setSelectValue(true);
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
                        {selectValue && (
                            <div className={cx('look-btn')} onClick={() => dispatch(actions.setCart(a))}>
                                <p className={cx('btn-text')}>add to bag</p>
                            </div>
                        )}
                    </div>
                )}
                onClickOutside={() => setShowSubTab(false)}
            >
                <div className={cx('look-slider')} onClick={() => setShowSubTab(true)}>
                    <img src={path} alt="slider-img" className={cx('look-slider__img')} />
                    <div className={cx('slider-btn')}>shop the look</div>
                </div>
            </Tippy>

            {showSubTab && <div className={cx('modal')}></div>}
        </>
    );
}

export default Look;
