import * as actions from '~/store/actions';
import styles from './Sidebar.module.scss';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
const cx = classNames.bind(styles);

function Sidebar() {
    const { menData, womenData, page, data, saleData } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [currentList, setCurrentList] = useState();

    useEffect(() => {
        switch (page) {
            case 'men':
                setCurrentList(menData);
                break;
            case 'women':
                setCurrentList(womenData);
                break;
            case 'unisex':
                setCurrentList(data);
                break;
            case 'sale':
                setCurrentList(saleData);
                break;
            default:
                break;
        }
    }, [page]);

    const categories = [
        'Lifestyle',
        'Running',
        'Basketball',
        'Training',
        'Soccer',
        'Football',
        'Tennis',
        'Golf',
        'Baseball',
        'Dance',
    ];

    const color = ['black', 'white', 'blue', 'pink', 'yellow', 'red'];

    const refPrice = useRef([]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ul className={cx('category')}>
                    <li
                        className={cx('category-item')}
                        onClick={() =>
                            dispatch(actions.setFilterList(currentList.filter((item) => item.brand === 'jordan')))
                        }
                    >
                        jordan
                    </li>
                    {categories.map((item, index) => (
                        <li
                            key={index}
                            className={cx('category-item')}
                            onClick={() =>
                                dispatch(actions.setFilterList(currentList.filter((i) => i.subCategory.includes(item))))
                            }
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <div className={cx('category')}>
                    <div className={cx('header')}>Gender</div>
                    <div>
                        <input type="checkbox" defaultChecked={page === 'men'} className={cx('category-input')} />
                        <label className={cx('category-item')}>Men</label>
                    </div>
                    <div>
                        <input type="checkbox" defaultChecked={page === 'women'} className={cx('category-input')} />
                        <label className={cx('category-item')}>women</label>
                    </div>
                    <div>
                        <input type="checkbox" className={cx('category-input')} />
                        <label className={cx('category-item')}>unisex</label>
                    </div>
                </div>
                <div className={cx('category')}>
                    <div className={cx('header')}>Price</div>
                    <div>
                        <input
                            ref={(element) => {
                                refPrice.current[0] = element;
                            }}
                            type="checkbox"
                            className={cx('category-input')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    dispatch(actions.setFilterList(currentList.filter((i) => i.currentPrice < 100)));
                                    refPrice.current[1].checked = false;
                                    refPrice.current[2].checked = false;
                                }
                            }}
                        />
                        <label className={cx('category-item')}>$50 - $100</label>
                    </div>
                    <div>
                        <input
                            ref={(element) => {
                                refPrice.current[1] = element;
                            }}
                            type="checkbox"
                            className={cx('category-input')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    dispatch(
                                        actions.setFilterList(
                                            currentList.filter((i) => i.currentPrice > 100 && i.currentPrice < 150),
                                        ),
                                    );
                                    refPrice.current[0].checked = false;
                                    refPrice.current[2].checked = false;
                                }
                            }}
                        />
                        <label className={cx('category-item')}>$100 - $150</label>
                    </div>
                    <div>
                        <input
                            ref={(element) => {
                                refPrice.current[2] = element;
                            }}
                            type="checkbox"
                            className={cx('category-input')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    dispatch(actions.setFilterList(currentList.filter((i) => i.currentPrice > 150)));
                                    refPrice.current[0].checked = false;
                                    refPrice.current[1].checked = false;
                                }
                            }}
                        />
                        <label className={cx('category-item')}>Over $150</label>
                    </div>
                </div>
                <div className={cx('category')}>
                    <div className={cx('header')}>Color</div>
                    <div className={cx('color-group')}>
                        {color.map((x, index) => (
                            <div
                                className={cx('color')}
                                key={index}
                                onClick={() =>
                                    dispatch(actions.setFilterList(currentList.filter((i) => i.color.includes(x))))
                                }
                            >
                                <div
                                    className={cx({
                                        'is-color': true,
                                        [`is-${x}`]: true,
                                    })}
                                ></div>
                                <p className={cx('color-text')}>{x}</p>
                            </div>
                        ))}
                        <div
                            className={cx('color')}
                            onClick={() =>
                                dispatch(actions.setFilterList(currentList.filter((i) => i.color.length > 1)))
                            }
                        >
                            <div
                                className={cx({
                                    'is-color': true,
                                    'is-multi': true,
                                })}
                            ></div>
                            <p className={cx('color-text')}>multi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
