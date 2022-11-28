import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = forwardRef(({ size, children, disabled, rightIcon, leftIcon, className, ...props }, ref) => {
    const classes = cx('wrapper', {
        [size]: size,
        [className]: className,
        disabled,
        rightIcon,
        leftIcon,
    });

    return (
        <button ref={ref} {...props} className={classes}>
            {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </button>
    );
});

export default Button;
