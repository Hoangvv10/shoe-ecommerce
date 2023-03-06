import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Navigate.module.scss';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);

function Navigate({ title }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={cx('navi')}>
            <Tippy
                interactive
                render={(attrs) => (
                    <div>
                        <div className={cx('subMenu')} tabIndex="-1" {...attrs}>
                            <div className={cx('inner')}>
                                <div className={cx('header')} onClick={() => navigate('/all')}>
                                    <span>All shoes</span>
                                    <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                                </div>
                                <ul className={cx('body')}>
                                    <li className={cx('item')}>Lifestyle</li>
                                    <li className={cx('item')}>jordan</li>
                                    <li className={cx('item')}>Air max</li>
                                    <li className={cx('item')}>air force 1</li>
                                    <li className={cx('item')}>blazer</li>
                                    <li className={cx('item')}>basketball</li>
                                    <li className={cx('item')}>running</li>
                                    <li className={cx('item')}>soccer</li>
                                    <li className={cx('item')}>golf</li>
                                    <li className={cx('item')}>training & gym</li>
                                    <li className={cx('item')}>shoes $100 and under</li>
                                    <li className={cx('item')}>sale</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            >
                <div
                    className={cx('title')}
                    onClick={() => {
                        navigate(`/${title}`);
                        dispatch(actions.setPage(`${title}`));
                    }}
                >
                    {title}
                </div>
            </Tippy>
        </div>
    );
}

export default Navigate;
