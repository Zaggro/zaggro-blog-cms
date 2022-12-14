import {
  collection,
  query,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore'
import slug from 'slug'
import { firestore } from './firebase'

export interface ArticleFirestoreDoc {
  title: string
  content: string
  active: boolean
  date: Timestamp
  imageUrl: string
  readLength: number | null
  category: string
  deleted?: boolean
  description: string
}

export interface Article {
  slug: string
  title: string
  content: string
  date: string
  imageUrl: string
  readLength: number | null
  category: string
  active: boolean
  id: string
  deleted?: boolean
  description: string
}

export async function getAllArticles() {
  const articles: Article[] = []

  try {
    const q = query(collection(firestore, 'articles'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const articleData = doc.data() as ArticleFirestoreDoc
      if (!articleData.deleted) {
        articles.push({
          active: articleData.active,
          slug: slug(articleData.title),
          title: articleData.title,
          content: articleData.content,
          date: articleData.date.toDate().toISOString().slice(0, 10),
          imageUrl: articleData.imageUrl,
          category: articleData.category,
          description: articleData.description,
          id: doc.id,
          readLength: articleData.readLength,
        })
      }
    })
  } catch {
    return []
  }

  return articles
}

export async function getArticle(id: Article['id']) {
  const articles = await getAllArticles()
  const data = articles.find((article) => article.id === id)
  return data
}

export async function createArticle(article: ArticleFirestoreDoc) {
  return addDoc(collection(firestore, 'articles'), article)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateArticle(id: string, fields: any) {
  const docRef = doc(firestore, 'articles', id)
  return setDoc(docRef, fields, { merge: true })
}

export async function deleteArticle(id: string) {
  const docRef = doc(firestore, 'articles', id)
  return setDoc(docRef, { deleted: true }, { merge: true })
}
