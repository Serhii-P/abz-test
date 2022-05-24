import React from 'react';
import './UserCard.scss';
import photoCover from "../../images/photo-cover.svg"

const UserCard = ({users}) => {

  const photoCard = (user) => {
    if (user.photo.match(/\w+\.(gif|png|tiff|bmp)$/gi) !== null) {
      return photoCover
    } 
    else {
      return user.photo
    }
  };

  return (
    <div className="user-cards">   
      {users && users.map(user =>   (
        <div className="user-card" key={user.id}>
          <img className='photo' src={photoCard(user)} alt="User"/>
          <p className="text">
            {user.name.length > 30 ? 
              (user.name.substring(0, 29) + '...') : 
              user.name}
          </p>
          <p className="text">{user.position}</p>
          <a className="mailto" href={`mailto:${user.email}`}>
            {user.email.length > 30 ? 
              (user.email.substring(0, 29) + '...') : 
              user.email}
            <span className="tooltiptext">{user.email}</span>
          </a>

          <p className="text">{user.phone}</p>
        </div>
      ))}
    </div>
  )
}

export default UserCard;