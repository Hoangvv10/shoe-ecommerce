import styles from './Product.module.scss';
import * as actions from '~/store/actions';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Product() {
    const [curItem, setCurItem] = useState(null);
    const [curId, setCurId] = useState(0);
    const [isActive, setIsActive] = useState();
    const [curSize, setCurSize] = useState(0);

    const dispatch = useDispatch();

    const { curShoeId, data } = useSelector((state) => state.app);

    useEffect(() => {
        setCurItem(data.filter((item) => item.id === curShoeId)[0]);
    }, [curShoeId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('small')}>
                        {curItem?.paths.map((item, index) => (
                            <div className={cx('thumbnail')} key={index} onClick={() => setCurId(index)}>
                                <img src={item} alt="thumbnai" className={cx('thumbnail-img')} />
                            </div>
                        ))}
                    </div>
                    <div className={cx('big')}>
                        <img src={curItem?.paths[curId]} alt="big-img" className={cx('big-img')} />
                        <div
                            className={cx('left-icon')}
                            onClick={() => {
                                curId === 0 ? setCurId(curItem?.paths.length - 1) : setCurId((prev) => prev - 1);
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div
                            className={cx('right-icon')}
                            onClick={() => {
                                curId < curItem?.paths.length - 1 ? setCurId((prev) => prev + 1) : setCurId(0);
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>

                <div className={cx('right')}>
                    <div className={cx('header')}>
                        {curItem?.brand} {curItem?.title}
                    </div>
                    <div className={cx('sub-title')}>
                        {curItem?.genders.length > 1 ? 'UNISEX' : `${curItem?.genders[0]}'s`} Shoes
                    </div>
                    <div className={cx('item-price')}>
                        <span>${curItem?.currentPrice}</span>
                        {curItem?.isSale === true && (
                            <>
                                <span className={cx('sale-price')}>${curItem?.fullPrice}</span>
                                <span className={cx('sale-num')}>
                                    {Math.floor(100 - (curItem?.currentPrice / curItem?.fullPrice) * 100)}%
                                </span>
                            </>
                        )}
                    </div>
                    <div className={cx('size-section')}>
                        <div className={cx('size-title')}>Select Size</div>
                        <div className={cx('size-group')}>
                            {curItem?.size.map((item, index) => (
                                <div
                                    className={cx({
                                        size: true,
                                        'is-active': isActive === index,
                                    })}
                                    key={index}
                                    onClick={() => {
                                        setIsActive(index);
                                        setCurSize(item);
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            className={cx({
                                btn: true,
                                primary: true,
                                disabled: curSize === 0,
                            })}
                            disabled={curSize === 0}
                            onClick={() =>
                                dispatch(
                                    actions.setCart({
                                        item: curItem,
                                        size: curSize,
                                    }),
                                )
                            }
                        >
                            Add to Bag
                        </button>
                        <button
                            className={cx({
                                btn: true,
                                secondary: true,
                            })}
                        >
                            <p>Favorite</p>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </div>

                    <div className={cx('descript')}>{curItem?.describe}</div>
                </div>
            </div>
        </div>
    );
}

export default Product;
