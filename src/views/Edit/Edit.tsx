/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { storage } from 'firestore/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify'
import { getArticle, updateArticle } from 'firestore/articles'

import EditorJS from '@editorjs/editorjs'
import EditorHeader from '@editorjs/header'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import ImageTool from '@editorjs/image'
// @ts-ignore
import Table from '@editorjs/table'

import styles from './Edit.module.scss'
import Button from 'components/Button/Button'

// TODO: fix image upload
function ArticlePage() {
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const uploadToFirestore = async (file: File) => {
    const storageRef = ref(storage, `blog/${file.name}-${id}`)
    try {
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return {
        success: 1,
        file: {
          url: downloadURL,
        },
      }
    } catch (error) {
      toast.error('Upload failed')
    }
    return {
      success: 0,
    }
  }

  const uploadCoverImage = async (event: any) => {
    const file = event.target.files[0]
    const result = await uploadToFirestore(file)
    if (result && result.success === 1) {
      setImageUrl(result?.file?.url || '')
    }
  }

  const [editorData, setEditorData] = useState()
  const [isEditorReady, setIsEditorReady] = useState(false)

  const initEditor = (data: any) => {
    if (isEditorReady) return
    const editor = new EditorJS({
      holder: 'editorjs',
      data,
      onReady: () => {
        setIsEditorReady(true)
      },
      onChange: async () => {
        // @ts-ignore
        const content = await editor.saver.save()
        // @ts-ignore
        setEditorData(content)
      },
      autofocus: true,
      tools: {
        header: EditorHeader,
        list: List,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                return uploadToFirestore(file)
              },
            },
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
      },
    })
  }

  useEffect(() => {
    const getArticles = async () => {
      if (id) {
        const doc = await getArticle(id)
        if (!doc) {
          alert('No article found')
          return
        }
        const data = JSON.parse(doc.content)
        setTitle(doc.title)
        setDate(doc.date)
        setCategory(doc.category)
        setDescription(doc.description)
        setImageUrl(doc.imageUrl)
        setEditorData(data)
        initEditor(data)
      }
    }

    getArticles()
  }, [])

  const saveChanges = () => {
    if (id) {
      try {
        updateArticle(id, {
          title,
          content: JSON.stringify(editorData),
          date: new Date(date),
          imageUrl,
          description,
          category,
        })
      } catch (error) {
        toast.error('Could not save the article')
      }
    }
    toast.success('🎉 Your changes have been saved!')
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Link to="/articles" className={styles.backToList}>
          &larr; Back to List
        </Link>
        <h1 className={styles.title}>Article</h1>
      </div>
      <Button
        onClick={saveChanges}
        className={styles.saveChanges}
        type="button"
      >
        Save Changes
      </Button>
      <div className={styles.editor}>
        <label className={styles.label} htmlFor="title">
          Title
          <input
            className={styles.input}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="date">
          Date
          <input
            className={styles.input}
            id="date"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="category">
          Category
          <input
            className={styles.input}
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="description">
          Description
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="image-upload">
          Upload image to get URL
          <input
            className={styles.input}
            id="image-upload"
            type="file"
            onChange={uploadCoverImage}
          />
        </label>
        {imageUrl && imageUrl !== '' && (
          <div>
            <img
              src={imageUrl}
              className={styles.articleImage}
              alt="article cover"
            />
          </div>
        )}
        <label className={styles.label} htmlFor="image">
          Or paste URL here
          <input
            className={styles.input}
            id="image"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="editorjs">
          Content
        </label>
        <div id="editorjs" className={styles.editorjs} />
      </div>
      <Button
        onClick={saveChanges}
        className={styles.saveChanges}
        type="button"
      >
        Save Changes
      </Button>
      <ToastContainer />
    </div>
  )
}

export default ArticlePage
