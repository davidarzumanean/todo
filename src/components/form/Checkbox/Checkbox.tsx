import type {FC} from "react";
import styles from './Checkbox.module.scss'
import {InputHTMLAttributes} from "react";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Checkbox: FC<ICheckboxProps> = ({checked, onChange}) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <div className={styles.checkmark} />
    </label>
  )
}