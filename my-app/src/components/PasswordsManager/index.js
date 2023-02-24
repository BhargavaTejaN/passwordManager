import {Component} from 'react'

import {v4 as uniqueId} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordsManager extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    searchInput: '',
    passwordsList: [],
    isFilterActive: false,
  }

  render() {
    const {
      passwordsList,
      websiteName,
      userName,
      password,
      isFilterActive,
      searchInput,
    } = this.state

    const onChangeWebsiteName = event => {
      this.setState({websiteName: event.target.value})
    }

    const onChangeUserName = event => {
      this.setState({userName: event.target.value})
    }

    const onChangePassword = event => {
      this.setState({password: event.target.value})
    }

    const onChangeSearchInput = event => {
      this.setState({searchInput: event.target.value})
    }

    const onSubmitForm = event => {
      event.preventDefault()

      const initialBackgroundColorClassName = `initial-container ${
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ]
      }`

      const newPasswordItem = {
        id: uniqueId(),
        websiteName,
        userName,
        password,
        isFilterActive,
        initialClassName: initialBackgroundColorClassName,
      }

      if (websiteName === '' || userName === '' || password === '') {
        alert('Please Enter all the manditory fields')
      } else {
        this.setState(prevState => ({
          passwordsList: [...prevState.passwordsList, newPasswordItem],
          websiteName: '',
          userName: '',
          password: '',
          isFilterActive,
        }))
      }
    }

    const onDeletePassword = id => {
      const filteredPasswordList = passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      )
      this.setState({passwordsList: filteredPasswordList})
    }

    const onShowPassword = () => {
      this.setState({isFilterActive: !isFilterActive})
    }

    const searchResultsList = passwordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    const renderPasswordsList = () => {
      const h = 5

      return (
        <ul className="appointments-list">
          {searchResultsList.map(eachPassword => (
            <PasswordItem
              details={eachPassword}
              key={eachPassword.id}
              isShowPassword={isFilterActive}
              onDeletePassword={onDeletePassword}
            />
          ))}
        </ul>
      )
    }

    const renderNoPasswordsList = () => {
      const a = 1

      return (
        <div className="no-password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            className="no-password-logo"
            alt="no passwords"
          />
          <p className="no-password-desc">No Passwords</p>
        </div>
      )
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={onSubmitForm}>
                <div className="form-container">
                  <h1 className="add-appointment-heading">Add New Password</h1>
                  <div className="search-input-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="search-icon"
                    />
                    <input
                      className="search-input"
                      type="text"
                      value={websiteName}
                      onChange={onChangeWebsiteName}
                      placeholder="Enter Website"
                    />
                  </div>
                  <div className="search-input-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="search-icon"
                    />
                    <input
                      className="search-input"
                      type="text"
                      value={userName}
                      onChange={onChangeUserName}
                      placeholder="Enter Username"
                    />
                  </div>
                  <div className="search-input-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="search-icon"
                    />
                    <input
                      className="search-input"
                      type="password"
                      value={password}
                      onChange={onChangePassword}
                      placeholder="Enter Password"
                    />
                  </div>
                  <button
                    data-testid="delete"
                    type="submit"
                    className="add-button"
                  >
                    Add
                  </button>
                </div>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                className="appointments-img"
                alt="password manager"
              />
            </div>
          </div>
        </div>
        <div className="responsive-container-bottom">
          <div className="header-with-filter-container">
            <div className="heading-count-container">
              <h1 className="appointments-heading">Your Passwords</h1>
              <p className="comments-count">{passwordsList.length}</p>
            </div>
            <div className="search-input-container-bottom">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="search-icon"
              />
              <input
                onChange={onChangeSearchInput}
                className="search-input"
                type="search"
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              id="show-password"
              className="input-checkbox"
              value={isFilterActive}
              onChange={onShowPassword}
            />
            <label className="label-desc" htmlFor="show-password">
              Show Passwords
            </label>
          </div>
          {searchResultsList.length > 0
            ? renderPasswordsList()
            : renderNoPasswordsList()}
        </div>
      </div>
    )
  }
}

export default PasswordsManager
