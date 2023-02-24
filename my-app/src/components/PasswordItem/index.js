import './index.css'

const PasswordItem = props => {
  const {details, onDeletePassword, isShowPassword} = props
  const {id, websiteName, userName, password, initialClassName} = details

  const initial = userName ? userName[0].toUpperCase() : ''

  const imgEl = (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      className="star-img"
      alt="stars"
    />
  )

  const passwordText = isShowPassword ? password : imgEl

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="container">
          <p className="">{websiteName}</p>
          <p className="">{userName}</p>
          <p className="">{passwordText}</p>
        </div>
        <button onClick={deletePassword} type="button" className="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
