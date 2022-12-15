import clsx from 'clsx'
import Adornment from 'components/Adornment/Adornment'
import CardBase from 'components/CardBase/CardBase'
import Typography from 'components/Typography/Typography'
import styles from './ArticlePreview.module.scss'
import { ReactComponent as Clock } from 'assets/svgs/clock.svg'
import dayjs from 'dayjs'

export interface ArticlePreviewProps {
  imageUrl: string
  articleUrl: string
  title: string
  category: string
  dateCreated: string
  readLength: string
  className?: string
}

function ArticlePreview({
  imageUrl,
  articleUrl,
  title,
  category,
  dateCreated,
  readLength,
  className,
}: ArticlePreviewProps) {
  const formattedDate = dayjs(dateCreated).format('DD MMMM YYYY')
  return (
    <CardBase
      className={clsx(styles.root, className)}
      contentClassName={styles.content}
      href={articleUrl}
    >
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt="" className={styles.image} />
        <Adornment className={styles.category}>{category}</Adornment>
      </div>
      <div className={styles.textContent}>
        <Typography tag="h3" variant="h5">
          {title}
        </Typography>
        <div className={styles.bottomDetails}>
          <div className={styles.detailsText}>{formattedDate}</div>
          {readLength && (
            <div className={styles.detailsText}>
              <Clock className={styles.clock} />
              {`${readLength} min read`}
            </div>
          )}
        </div>
      </div>
    </CardBase>
  )
}

export default ArticlePreview
