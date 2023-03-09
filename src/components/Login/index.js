import styles from './Login.module.scss';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [open, setOpen] = useState();
    const [formValues, setFormValues] = useState({
        name: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [signUpValues, setSignUpValues] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [signUpErrors, setSignUpErrors] = useState({});

    let loginRef = useRef();
    useEffect(() => {
        let handleOpen = (e) => {
            if (!loginRef.current.contains(e.target)) {
                setOpen(false);
                setIsLogin(true);
                setFormValues({
                    name: '',
                    password: '',
                });
                setSignUpValues({
                    firstName: '',
                    lastName: '',
                    number: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            }
        };

        document.addEventListener('mousedown', handleOpen);

        return () => {
            document.removeEventListener('mousedown', handleOpen);
        };
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setSignUpValues({ ...signUpValues, [name]: value });
        setIsSubmit(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        console.log(123);
        setSignUpErrors(validateSignUp(signUpValues));
    };

    const validate = (values) => {
        const error = {};
        if (!values.name) {
            error.name = 'Username is required!';
        }
        if (!values.password) {
            error.password = 'Password is required!';
        }

        return error;
    };

    const validateSignUp = (values) => {
        const signUpError = {};
        const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        if (!values.firstName && !values.lastName) {
            signUpError.name = 'Name is required!';
        }
        if (!values.number) {
            signUpError.number = 'Phone number is required!';
        } else if (!phoneRegex.test(values.number)) {
            signUpError.number = 'Phone number is invalid!';
        }
        if (!values.email) {
            signUpError.email = 'Email is required!';
        } else if (!emailRegex.test(values.email)) {
            signUpError.number = 'Email is invalid!';
        }
        if (!values.password) {
            signUpError.password = 'Password is required!';
        } else if (!passwordRegex.test(values.password)) {
            signUpError.password = 'Password must contain: 1 upper case letter, 1 number and be at least 6 letters!';
        }
        if (!(values.password === values.confirmPassword)) {
            signUpError.confirmPassword = 'Password is not matched!';
        }

        return signUpError;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, []);

    console.log(signUpErrors);

    return (
        <div>
            <div className={cx('right-item')} onClick={() => setOpen(true)}>
                <FontAwesomeIcon className={cx('item-icon')} icon={faUser} />
                <span className={cx('item')}>Login</span>
            </div>
            <div
                className={cx({
                    wrapper: true,
                    inactive: !open,
                })}
            >
                <div className={cx('inner')}>
                    <div className={cx('modal')} ref={loginRef}>
                        <div className={cx('header')}>{isLogin ? 'Login' : 'Sign Up'}</div>

                        {isLogin ? (
                            <form className={cx('body')} onSubmit={handleSubmit}>
                                <div className={cx('input')}>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Username"
                                        value={formValues.name}
                                        onChange={handleInput}
                                    />
                                </div>
                                {!(formErrors.name === undefined) && (
                                    <p className={cx('error-message')}>{formErrors.name}</p>
                                )}
                                <div className={cx('input')}>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formValues.password}
                                        onChange={handleInput}
                                        autoComplete="on"
                                    />
                                </div>
                                {!(formErrors.password === undefined) && (
                                    <p className={cx('error-message')}>{formErrors.password}</p>
                                )}
                                <input type="submit" value="Login" className={cx('submit')} />
                            </form>
                        ) : (
                            <form className={cx('body')} onSubmit={handleSignUpSubmit}>
                                <div className={cx('sign-up-input')}>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        name="firstName"
                                        className={cx('name-input')}
                                        value={signUpValues.firstName}
                                        onChange={handleInput}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        name="lastName"
                                        className={cx('name-input')}
                                        value={signUpValues.lastName}
                                        onChange={handleInput}
                                    />
                                </div>
                                {signUpErrors.name && <p className={cx('error-message')}>{signUpErrors.name}</p>}
                                <div>
                                    <input
                                        type="text"
                                        name="number"
                                        placeholder="Phone"
                                        className={cx('number-input')}
                                        value={signUpValues.number}
                                        onChange={handleInput}
                                    />
                                    {signUpErrors.number && (
                                        <p className={cx('error-message')}>{signUpErrors.number}</p>
                                    )}
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className={cx('number-input')}
                                        value={signUpValues.email}
                                        onChange={handleInput}
                                        autoComplete="on"
                                    />
                                    {signUpErrors.email && <p className={cx('error-message')}>{signUpErrors.email}</p>}
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className={cx('number-input')}
                                    value={signUpValues.password}
                                    onChange={handleInput}
                                    autoComplete="on"
                                />
                                {signUpErrors.password && (
                                    <p className={cx('error-message')}>{signUpErrors.password}</p>
                                )}
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className={cx('number-input')}
                                    value={signUpValues.confirmPassword}
                                    onChange={handleInput}
                                    autoComplete="on"
                                />
                                {signUpErrors.confirmPassword && (
                                    <p className={cx('error-message')}>{signUpErrors.confirmPassword}</p>
                                )}
                                <input type="submit" value="Sign Up" className={cx('submit')} />
                            </form>
                        )}

                        {isLogin && (
                            <div className={cx('footer')}>
                                <span>Not a member? </span>
                                <span className={cx('sign-up')} onClick={() => setIsLogin(false)}>
                                    Sign up
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
