import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticle, Article } from 'firestore/articles'
import ArticlePage from 'components/Article/Article'
import styles from './Preview.module.scss'

function ArticlePreview() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article>()

  useEffect(() => {
    const getArticles = async () => {
      if (id) {
        const doc = await getArticle(id)
        if (!doc) {
          return
        }
        setArticle(doc)
      }
    }
    getArticles()
  }, [])

  if (!article) return <div>Loading...</div>

  return (
    <>
      <div className={styles.root}>
        <Link to="/articles" className={styles.backToList}>
          &larr; Back to List
        </Link>
        <ArticlePage {...article} />
      </div>
    </>
  )
}

export default ArticlePreview
