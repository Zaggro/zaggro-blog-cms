import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import { auth } from 'firestore/firebase'
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  Article,
} from 'firestore/articles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import ArticlePreview from 'components/ArticlePreview/ArticlePreview'
import styles from './List.module.scss'
import Button from 'components/Button/Button'

function List() {
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const getArticles = async () => {
      setArticles(await getAllArticles())
    }
    getArticles()
  }, [refresh])

  const setActive = async (id: string) => {
    const article = articles.find((article) => article.id === id)

    const newStatus = !article?.active
    await updateArticle(id, { active: newStatus })
    setRefresh(!refresh)
    toast.success('🎉 Your changes have been saved!')
  }

  const setDeleted = async (id: string) => {
    if (window.confirm('Are you sure you wish to delete this article?')) {
      await deleteArticle(id)
      setRefresh(true)
      toast.success('Article deleted. Your changes have been saved!')
    }
  }

  const addArticle = async () => {
    const defaultEditor = {
      time: new Date().getTime(),
      blocks: [],
      version: '2.23.2',
    }
    const docRef = await createArticle({
      active: false,
      title: '',
      content: JSON.stringify(defaultEditor),
      description: '',
      date: Timestamp.now(),
      imageUrl: '',
      category: '',
      readLength: '',
    })
    navigate(`/articles/${docRef.id}/edit`)
  }

  const logout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className={styles.root}>
      <ToastContainer />
      <button className={styles.logout} type="button" onClick={logout}>
        Logout
      </button>
      <h1 className={styles.title}>Articles</h1>
      <Button onClick={addArticle} className={styles.addNew}>
        + Add New
      </Button>
      <div className={styles.articles}>
        {articles.map(
          ({
            id,
            title,
            date,
            imageUrl,
            active,
            category,
            readLength,
          }: Article) => {
            return (
              <div key={id} className={styles.articleContainer}>
                <ArticlePreview
                  imageUrl={imageUrl}
                  articleUrl=""
                  title={title}
                  category={category}
                  dateCreated={date}
                  readLength={readLength}
                  className={styles.article}
                />
                <div className={styles.controlsContainer}>
                  <div
                    className={clsx(styles.status, active && styles.published)}
                  >
                    {active ? 'Published' : 'Draft'}
                  </div>
                  <div className={styles.controls}>
                    <Link to={`/articles/${id}/edit`}>Edit</Link>
                    <Link to={`/articles/${id}/preview`}>Preview</Link>
                    <button onClick={() => setActive(id)} type="button">
                      {active ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => setDeleted(id)} type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default List
