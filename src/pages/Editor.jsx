import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import articlesAPI from "lib/api/articles"
import history from "lib/utils/history"

const changePathnameToWord = (pathname) =>
  pathname.replace("editor", "").replace(/\//g, "")

function Editor() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const [tagList, setTagList] = useState([])

  const [lastTag, setLastTag] = useState("")
  const [slug, setSlug] = useState(
    changePathnameToWord(window.location.pathname)
  )

  const { user } = useSelector((state) => state)

  useEffect(() => {
    return history.listen((location) => {
      setSlug(changePathnameToWord(location.pathname))
    })
  }, [])

  useEffect(() => {
    if (slug) {
      async function getArticle() {
        const { article, status } = await articlesAPI.getOne(slug, user.token)
        if (status === 200) {
          setBody(article.body)
          setTagList(article.tagList)
          setDescription(article.description)
          setTitle(article.title)
        } else {
          history.push("/")
        }
      }
      getArticle()
    }
  }, [user.token, slug])

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!slug) {
                  const { article } = await articlesAPI.createArticle({
                    title,
                    description,
                    body,
                    tagList,
                    token: user.token,
                  })
                  history.push(`/article/${article.slug}`)
                } else {
                  const { article } = await articlesAPI.editArticle({
                    title,
                    description,
                    body,
                    tagList,
                    token: user.token,
                    slug,
                  })
                  history.push(`/article/${article.slug}`)
                }
              }}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Article Title'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder="What's this article about?"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control'
                    rows='8'
                    placeholder='Write your article (in markdown)'
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value)
                    }}></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter tags'
                    value={lastTag}
                    onKeyDown={(e) => {
                      if (lastTag && (e.keyCode === 13 || e.keyCode === 188)) {
                        e.preventDefault()
                        setTagList([...tagList, ...e.target.value.split(",")])
                        setLastTag("")
                      }
                    }}
                    onBlur={(e) => {
                      if (lastTag) {
                        setTagList([...tagList, ...e.target.value.split(",")])
                        setLastTag("")
                      }
                    }}
                    onChange={(e) => {
                      setLastTag(e.target.value.split(","))
                    }}
                  />
                  <div class='tag-list'>
                    {tagList.map((tag, i) => {
                      return (
                        <span key={i} class='tag-default tag-pill'>
                          <i
                            class='ion-close-round'
                            onClick={() => {
                              setTagList([...tagList].filter((t, j) => j !== i))
                            }}></i>
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </fieldset>
                <button
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='submit'>
                  {slug ? "Update Article" : "Publish Article"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
