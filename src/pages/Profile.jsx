import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import userAPI from "lib/api/user"
import history from "lib/utils/history"

import { setArticlesAuthor } from "redux/slices/articlesSlice"
import ArticlesList from "components/Home/ArticlesList"

function Profile() {
  const [username] = useState(window.location.pathname.replace("/profile/", ""))
  const [profile, setProfile] = useState()

  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setArticlesAuthor(username))
    async function getArticle() {
      const { profile, status } = await userAPI.getProfile(username, user.token)
      if (status === 200) {
        user.token ? setProfile(profile) : setProfile(profile)
      } else {
        history.push("/")
      }
    }
    getArticle()
  }, [user.token, username, dispatch])

  console.log(profile)
  if (!profile) {
    return <p>Loading...</p>
  }

  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <img
                src={profile.image}
                className='user-img'
                alt={profile.username}
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              <button className='btn btn-sm btn-outline-secondary action-btn'>
                <i className='ion-plus-round'></i>
                &nbsp; Follow {profile.username}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <a className='nav-link active' href=''>
                    My Articles
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href=''>
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            <ArticlesList />

            {/* <div className='article-preview'>
              <div className='article-meta'>
                <a href=''>
                  <img src='http://i.imgur.com/Qr71crq.jpg' />
                </a>
                <div className='info'>
                  <a href='' className='author'>
                    Eric Simons
                  </a>
                  <span className='date'>January 20th</span>
                </div>
                <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i className='ion-heart'></i> 29
                </button>
              </div>
              <a href='' className='preview-link'>
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className='article-preview'>
              <div className='article-meta'>
                <a href=''>
                  <img src='http://i.imgur.com/N4VcUeJ.jpg' />
                </a>
                <div className='info'>
                  <a href='' className='author'>
                    Albert Pai
                  </a>
                  <span className='date'>January 20th</span>
                </div>
                <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i className='ion-heart'></i> 32
                </button>
              </div>
              <a href='' className='preview-link'>
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className='tag-list'>
                  <li className='tag-default tag-pill tag-outline'>Music</li>
                  <li className='tag-default tag-pill tag-outline'>Song</li>
                </ul>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
