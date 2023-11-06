import type {FC, ButtonHTMLAttributes} from "react";
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: FC<IButtonProps> = ({children, className, variant = 'primary', ...rest}) => {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <button className={`${styles.button} ${className} ${variantClass}`} {...rest}>
      {children}
    </button>
  )
}
