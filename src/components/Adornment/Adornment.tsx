import clsx from 'clsx'
import styles from './Adornment.module.scss'

export interface AdornmentProps {
  children: React.ReactNode
  className?: string
}

function Adornment({ children, className }: AdornmentProps) {
  return <div className={clsx(styles.root, className)}>{children}</div>
}

export default Adornment
