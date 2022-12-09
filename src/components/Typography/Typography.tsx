import clsx from 'clsx'
import styles from './Typography.module.scss'

export interface TypographyProps {
  tag?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?:
    | 'display-sm'
    | 'display-md'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'link-sm'
    | 'link-md'
    | 'link-lg'
    | 'button'
    | 'menu-sm'
    | 'menu-md'
    | 'blockquote-sm'
    | 'blockquote-md'
    | 'p-sm'
    | 'p-md'
    | 'p-lg'
    | 'p-xl'
  children?: React.ReactNode
  className?: string
}

function Typography({
  tag: Element = 'div',
  variant,
  children,
  className,
  ...rest
}: TypographyProps) {
  return (
    <Element className={clsx(variant && styles[variant], className)} {...rest}>
      {children}
    </Element>
  )
}

export default Typography
