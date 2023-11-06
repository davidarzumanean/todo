import type {FC, InputHTMLAttributes} from "react";
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input: FC<IInputProps> = ({
  type = 'text',
  className = '',
  ...rest
}) => {
  return (
    <input type={type} className={`${styles.input} ${className}`} {...rest} />
  )
}