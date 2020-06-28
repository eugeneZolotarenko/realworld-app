import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import userAPI from "lib/api/user"
import history from "lib/utils/history"

import { setArticlesAuthor } from "redux/slices/articlesSlice"
import ArticlesList from "components/Home/ArticlesList"
import Tabs from "components/Home/Tabs"

const changePathnameToWord = (pathname) =>
  pathname.replace("profile", "").replace(/\//g, "")

function Profile() {
  const { user } = useSelector((state) => state)
  const [profile, setProfile] = useState()
  const [followedUser, setFollowedUser] = useState()
  const [username, setUsername] = useState(
    changePathnameToWord(window.location.pathname)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return history.listen((location) => {
      setUsername(changePathnameToWord(location.pathname))
    })
  }, [])

  useEffect(() => {
    dispatch(setArticlesAuthor(username))
    async function getArticle() {
      const { profile, status } = await userAPI.getProfile(username, user.token)
      if (status === 200) {
        setProfile(profile)
        setFollowedUser(profile.following)
      } else {
        history.push("/")
      }
    }
    getArticle()
  }, [user.token, username, dispatch])

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
              {user.token && user.username === profile.username && (
                <Link
                  class='btn btn-sm btn-outline-secondary action-btn'
                  to='/settings'>
                  <i class='ion-gear-a'></i> Edit Profile Settings
                </Link>
              )}
              {user.token && user.username !== profile.username && (
                <button
                  className={
                    followedUser
                      ? "btn btn-sm btn-outline-secondary action-btn active"
                      : "btn btn-sm btn-outline-secondary action-btn"
                  }
                  onClick={async () => {
                    setFollowedUser(!followedUser)
                    followedUser
                      ? await userAPI.unFollowUser(profile.username, user.token)
                      : await userAPI.followUser(profile.username, user.token)
                  }}>
                  <i className='ion-plus-round'></i>
                  &nbsp; {followedUser ? "Unfollow" : "Follow"}{" "}
                  {profile.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <Tabs location='profile' userName={profile.username} />
            <ArticlesList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
