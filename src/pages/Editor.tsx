import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import articlesAPI from "lib/api/articles"
import history from "lib/utils/history"

import { RootState } from "redux/rootReducer"

const changePathnameToWord = (pathname: string) =>
  pathname.replace("editor", "").replace(/\//g, "")

function Editor() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const [tagList, setTagList] = useState<string[]>([])

  const [lastTag, setLastTag] = useState<string>("")
  const [slug, setSlug] = useState(
    changePathnameToWord(history.location.pathname)
  )

  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { user } = useSelector((state: RootState) => state)

  useEffect(() => {
    return history.listen((location) => {
      if (changePathnameToWord(location.pathname)) {
        setSlug(changePathnameToWord(location.pathname))
      } else {
        setBody("")
        setTagList([])
        setDescription("")
        setTitle("")
        setSlug("")
      }
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

  const handleSubmit = async () => {
    setLoading(true)
    if (title && description && body) {
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
    } else {
      setError(true)
    }
    setLoading(false)
  }

  const addTags = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if (lastTag) {
      setTagList([
        ...tagList,
        ...(e.target as HTMLInputElement).value.split(","),
      ])
      setLastTag("")
    }
  }

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                handleSubmit()
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
                      setError(false)
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
                      setError(false)
                    }}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control'
                    rows={8}
                    placeholder='Write your article (in markdown)'
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value)
                      setError(false)
                    }}></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter tags'
                    value={lastTag}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13 || e.keyCode === 188) {
                        e.preventDefault()
                        addTags(e)
                      }
                    }}
                    onBlur={(e) => addTags(e)}
                    onChange={(e) =>
                      setLastTag(
                        (e.target as HTMLInputElement).value.split(",").join()
                      )
                    }
                  />
                  <div className='tag-list'>
                    {tagList.map((tag, i) => {
                      return (
                        <span key={i} className='tag-default tag-pill'>
                          <i
                            className='ion-close-round'
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
                  type='submit'
                  disabled={isLoading ? true : false}>
                  {slug ? "Update Article" : "Publish Article"}
                </button>
              </fieldset>
            </form>
            {isError && (
              <p className='error-messages'>
                Title, Description and Body of article cannot be empty
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
