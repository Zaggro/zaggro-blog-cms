import clsx from 'clsx'
import Adornment from 'components/Adornment/Adornment'
import styles from './CardBase.module.scss'

export interface CardBaseProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  icon?: React.ReactElement
  href?: string
  target?: string
  comingSoon?: boolean
  className?: string
  contentClassName?: string
  id?: string
}

function CardBase({
  children,
  variant = 'primary',
  icon,
  comingSoon,
  href,
  target,
  className,
  contentClassName,
  id,
}: CardBaseProps) {
  const commonProps = {
    className: clsx(
      styles.root,
      styles[variant],
      href && styles.link,
      icon && styles.withIcon,
      comingSoon && styles.withComingSoon,
      className
    ),
    id,
  }

  const content = (
    <>
      <div className={styles.blurBorder} />
      <div className={contentClassName}>
        {comingSoon && (
          <Adornment className={styles.comingSoon}>Coming soon</Adornment>
        )}
        {children}
      </div>
    </>
  )

  if (href) {
    return (
      <a href={href} target={target} {...commonProps}>
        {content}
      </a>
    )
  }

  return <div {...commonProps}>{content}</div>
}

export default CardBase
