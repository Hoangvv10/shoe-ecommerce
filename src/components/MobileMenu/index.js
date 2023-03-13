import { faAngleRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './MobileMenu.module.scss';
import * as actions from '~/store/actions';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigate from '../Navigate';

const cx = classNames.bind(styles);

function MobileMenu() {
    const { cart } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let menuRef = useRef();

    const nav = ['men', 'woman', 'kid', 'sale'];

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon className={cx('item-icon')} icon={faBars} />
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
                        <div className={cx('modal-header')}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className={cx('modal-body')}>
                            {nav.map((item, index) => (
                                <div
                                    className={cx('item')}
                                    key={index}
                                    onClick={() => {
                                        navigate(`/${item}`);
                                        dispatch(actions.setPage(`${item}`));
                                        setOpen(false);
                                    }}
                                >
                                    <p className={cx('item-title')}>{item}</p>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('footer')}></div>
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
