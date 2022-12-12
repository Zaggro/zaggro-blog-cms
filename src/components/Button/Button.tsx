import clsx from 'clsx'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

export interface ButtonProps {
  variant?: 'primary' | 'secondary'
  /**
   *  Link url. If provided, will the Button component will act as a link instead.
   */
  href?: string
  /**
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

function Button({
  variant = 'primary',
  href,
  onClick,
  disabled,
  type = 'button',
  children,
  className,
}: ButtonProps) {
  const commonProps = {
    className: clsx(
      styles.root,
      styles[variant],
      disabled && styles.disabled,
      href && styles.link,
      className
    ),
    onClick,
  }

  const content = (
    <div className={styles.container}>
      {!disabled && (
        <>
          <div className={styles.solidBorder} />
          <div className={styles.blurBorder} />
        </>
      )}
      {children}
    </div>
  )

  if (href) {
    return (
      <Link to={href}>
        <a {...commonProps}>{content}</a>
      </Link>
    )
  }

  return (
    <button {...commonProps} type={type} disabled={disabled}>
      {content}
    </button>
  )
}

export default Button
