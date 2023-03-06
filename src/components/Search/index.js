import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.scss';
import { useDebounced } from '~/hooks';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);

function Search() {
    const { data } = useSelector((state) => state.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const debounced = useDebounced(searchValue, 1000);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const responsive = data.filter((item) => item.title.includes(debounced));
        setSearchResult(responsive);
    }, [debounced]);

    const inputRef = useRef();

    const hideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('tippy')}>
            <Tippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <PopperWrapper>
                        <div className="search-result" tabIndex="-1" {...attrs}>
                            <header className={cx('header')}>
                                <p>Nổi bật</p>
                            </header>
                            <div className={cx('body')}>
                                {searchResult?.map((item) => (
                                    <div
                                        className={cx('item')}
                                        key={item.id}
                                        onClick={() => {
                                            navigate(`/${item.title}`);
                                            dispatch(actions.setCurShoesID(item.id));
                                        }}
                                    >
                                        <img src={item?.paths[0]} alt="search-img" className={cx('item-img')} />
                                        <div className={cx('item-info')}>
                                            <p>{item.title}</p>
                                            <p>{item.brand}</p>
                                            <div>
                                                <span>${item.currentPrice}</span>
                                                {item.isSale === true && (
                                                    <span className={cx('price')}>${item.fullPrice}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="search-result" tabIndex="-1" {...attrs}></div>
                    </PopperWrapper>
                )}
                onClickOutside={hideResult}
            >
                <form className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className={cx('search-input')}
                        placeholder="Tìm kiếm sản phẩm..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSearchValue((e.target.value = ''));
                        }}
                        className={cx('clear')}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <span className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                </form>
            </Tippy>
        </div>
    );
}

export default Search;
