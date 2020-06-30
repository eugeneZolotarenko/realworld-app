import React, { useState } from "react"

function Editor() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            <form>
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
                    onChange={(e) => {
                      setBody(e.target.value)
                    }}
                  />
                  <div className='tag-list'></div>
                </fieldset>
                <button
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='button'>
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
