import styles from './Home.module.scss';
import Look from '~/components/Look';
import * as actions from '~/store/actions';

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    const first = data.filter((item) => item.title === 'invincible 3');
    const second = data.filter((item) => item.title === 'daybreak');
    const third = data.filter(
        (item) => item.title === 'alpha huarache elite 4 mid' || item.title === 'alpha huarache elite 4 low',
    );
    let randomNum = Math.floor(Math.random() * data.length);
    let fourth = null;

    data.length - randomNum > 3
        ? (fourth = data.slice(randomNum, randomNum + 3))
        : (fourth = data.slice(randomNum - 3, randomNum));

    const fifth = data.filter(
        (item) => item.title === 'air 1 retro high' || item.title === 'blaze mid' || item.title === 'Air force 1',
    );
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/0a5aa15e-e49a-4b32-925c-8a848b234b79/nike-just-do-it.jpg"
                        alt="banner"
                        className={cx('banner-img')}
                    />
                    <div className={cx('banner-body')}>
                        <div className={cx('title')}>
                            all the cushion,
                            <br /> all the feel
                        </div>
                        <div className={cx('descript')}>
                            The Nike Invincible 3 is our most cushioned road-running shoe yet.
                        </div>
                        <button className={cx('btn')} onClick={() => navigate('/men')}>
                            shop the running shoes
                        </button>
                    </div>
                </div>
                <div className={cx('look-section')}>
                    <div className={cx('section-inner')}>
                        <Look
                            products={first}
                            path="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_593,c_limit/efcb41d3-9ccd-48b0-8384-039c91280cce/nike-just-do-it.jpg"
                        />
                        <Look
                            products={second}
                            path="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_557,c_limit/b9e98cb2-fe33-4004-99fe-e057d5b3c450/nike-just-do-it.jpg"
                        />
                        <Look
                            products={third}
                            path="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_557,c_limit/4ca0acb6-ddfc-443f-8920-605a0aee40b4/nike-just-do-it.jpg"
                        />
                    </div>
                </div>
                <div>
                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1126,c_limit/c747ef67-329f-4bbf-81ad-5dff7e0d7ea5/nike-just-do-it.jpg"
                        alt="banner"
                        className={cx('banner-img')}
                    />
                    <div className={cx('banner-body')}>
                        <div className={cx('title')}>artist series</div>
                        <div className={cx('descript')}>
                            Combining innovative art with familiar silhouettes, we're creating a canvas for
                            <br />
                            up-and-coming artists from the Black community.
                        </div>
                        <button className={cx('btn')} onClick={() => navigate('/all')}>
                            shop
                        </button>
                    </div>
                </div>
                <div className={cx('popular-section')}>
                    <div className={cx('section-header')}>popular right now</div>
                    <div className={cx('section-inner')}>
                        {fourth.map((item) => (
                            <div
                                className={cx('popular-item')}
                                key={item.id}
                                onClick={() => {
                                    navigate(`/${item.title}`);
                                    dispatch(actions.setCurShoesID(item.id));
                                }}
                            >
                                <img src={item?.paths[0]} alt="popular-imgs" className={cx('popular-img')} />
                                <div className={cx('popular-title')}>
                                    <span>
                                        {item.brand} {item.title}
                                    </span>
                                    <span>${item.currentPrice}</span>
                                </div>
                                <div className={cx('popular-descript')}>{item.subCategory[0]} shoes</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={cx('section-header')}>trending now</div>

                    <img
                        src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/ea7d3b35-a1dc-49fd-82a6-ddeb4244c955/nike-just-do-it.jpg"
                        alt="banner"
                        className={cx('banner-img')}
                    />
                    <div className={cx('banner-body')}>
                        <div className={cx('title')}>nike style</div>
                        <div className={cx('descript')}>
                            Creative Director, Cynthia Cervantes keeps 'em guessing with unexpected style choices.
                            <br />
                            Shop her day-to-night looks.
                        </div>
                        <button className={cx('btn')}>shop women's shoes</button>
                    </div>
                </div>
                <div className={cx('popular-section')}>
                    <div className={cx('section-header')}>always iconic</div>
                    <div className={cx('section-inner')}>
                        {fifth.map((item, index) => (
                            <div
                                className={cx('popular-item')}
                                key={index}
                                onClick={() => {
                                    navigate(`/${item.title}`);
                                    dispatch(actions.setCurShoesID(item.id));
                                }}
                            >
                                <img src={item?.homePath} alt="popular-imgs" className={cx('popular-img')} />
                                <div className={cx('popular-title')}>
                                    <span>
                                        {item.brand} {item.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
