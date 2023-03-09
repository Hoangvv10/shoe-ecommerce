import styles from './Header.module.scss';

import classNames from 'classnames/bind';
import Search from '~/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Navigate from '~/components/Navigate';
import { useNavigate } from 'react-router-dom';
import Cart from '~/components/Cart';
import Login from '~/components/Login';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('top')}>
                    <p className={cx('top-left')}>Free Shipping Over $100 & Free Returns</p>
                    <div className={cx('top-right')}>
                        <p className={cx('top-hotline')}>Hotline: 000 111 2222 - 111 222 3333</p>
                        <div className={cx('top-option')}>
                            <div className={cx('languagers')}></div>
                            <div className={cx('currency')}></div>
                        </div>
                    </div>
                </div>

                <div className={cx('middle')}>
                    <div className={cx('logo')} onClick={() => navigate('/')}>
                        <svg
                            aria-hidden="true"
                            className="pre-logo-svg"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="100px"
                            height="100px"
                            fill="none"
                        >
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <Search />
                    <div className={cx('mid-right')}>
                        <div className={cx('right-item')}>
                            <FontAwesomeIcon className={cx('item-icon')} icon={faCodeCompare} />
                            <span className={cx('item')}>Compare Product</span>
                        </div>
                        <div className={cx('right-item')}>
                            <FontAwesomeIcon className={cx('item-icon')} icon={faHeart} />
                            <span className={cx('item')}>Wishlist</span>
                        </div>
                        <Login />
                        <Cart />
                    </div>
                </div>
            </div>
            <div className={cx('bottom')}>
                <Navigate title="men" />
                <Navigate title="woman" />
                <Navigate title="kid" />
                <Navigate title="sale" />
            </div>
        </div>
    );
}

export default Header;
