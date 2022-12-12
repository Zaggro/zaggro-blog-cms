import clsx from 'clsx'
import styles from './Preview.module.scss'

interface PreviewProps {
  className?: string
}

function Preview({ className }: PreviewProps) {
  return <div className={clsx(styles.root, className)}>Preview</div>
}

export default Preview
