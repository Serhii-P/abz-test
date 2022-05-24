
import { useState } from 'react';
import FormBlock from './components/FormBlock/FormBlock';
import Header from './components/Header/Header';
import MainDescription from './components/MainDescription/MainDescription';
import UsersPage from './components/UsersPage/UsersPage';
import './App.scss';

function App() {
  const [count, setCount] = useState(6);
  const [isUpdated, setIsUpdated] = useState(false);
  
  const submitUpdate = () => {
    count === 6 ? 
      setIsUpdated(!isUpdated) : 
      setCount(6)
  }
 
  return (
    <>
      <Header />
        <div className="app-main">
          <MainDescription />
          <UsersPage 
            count={count}
            isUpdated={isUpdated}
            setCount={setCount}
          />
          <FormBlock submitUpdate={submitUpdate}/>
        </div>
    </>
  );
}

export default App;
