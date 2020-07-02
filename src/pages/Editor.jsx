import React, { useState } from "react"
import { useSelector } from "react-redux"

import articlesAPI from "lib/api/articles"

function Editor() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const [tagList, setTagList] = useState([])

  const [lastTag, setLastTag] = useState("")

  const { user } = useSelector((state) => state)

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                await articlesAPI.createArticle({
                  title,
                  description,
                  body,
                  tagList,
                  token: user.token,
                })
              }}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Article Title'
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
                  Publish Article
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
