import * as actions from '~/store/actions';
import styles from '../Men/Men.module.scss';

import classNames from 'classnames/bind';
import Sidebar from '~/components/layouts/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Women() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list, womenData } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(actions.setFilterList(womenData));
        dispatch(actions.setPage('women'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={cx('wrapper')}
            style={{
                minHeight: '1000px',
            }}
        >
            <div className={cx('header')}>Women's shoes & sneaker ({list.length})</div>
            <Sidebar />
            <div className={cx('container')}>
                <div className={cx('group-item')}>
                    {list.map((item, id) => (
                        <div
                            className={cx('item')}
                            key={id}
                            onClick={() => {
                                navigate(`/${item.title}`);
                                dispatch(actions.setCurShoesID(item.id));
                            }}
                        >
                            <img src={item?.paths[0]} alt="shoes-img" className={cx('item-img')} />
                            <p className={cx('item-title')}>
                                {item.brand} {item.title}
                            </p>
                            <div className={cx('item-price')}>
                                <span>${item.currentPrice}</span>
                                {item.isSale === true && (
                                    <>
                                        <span className={cx('sale-price')}>${item.fullPrice}</span>
                                        <span className={cx('sale-num')}>
                                            {Math.floor(100 - (item.currentPrice / item.fullPrice) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Women;
