
import { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import { getUsers } from '../../api';
import Preloader from '../Preloader/Preloader';
import UserCard from '../UserCard/UserCard';
import './UsersPage.scss';

const UsersPage = ({ count, isUpdated, setCount }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(count)
    .then(res => {
      setIsLoading(true)
      setUsers(res)
    })
    .catch(error => {
      setIsLoading(true)
      setError(error)
    })
    .finally(setIsLoading(false));
  }, [count, isUpdated]);

  const showMoreUsers = () => {
    setCount((prevCount) => prevCount + 6)
  }

  if(error){
    return (<p>{JSON.stringify(error)}</p>)
  }

  return (
    <div className="users-page">
      <Element name="users">
      <div className="container">
      <h1 className="title">Working with GET request</h1>
      <div className="users-cards__container">
        {users.length > 0 ? 
          <UserCard users={users} />  
          : null}
      </div>
      <div className="users-page__btn">
        {!isLoading && <Preloader/>}
        {count > users.length
          ? null
          : 
          <button className='page-button content-button' onClick={showMoreUsers}>
            Show more
          </button>
          }
      </div>
      </div>
      </Element>
    </div>
  )
}

export default UsersPage;