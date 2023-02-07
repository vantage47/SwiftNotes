// Boiler plate - rafce 
import React from 'react' 
import Notes from './Notes'; //Making a seperate Notes component where we can Add Fetch and Update our notes!

const Home = (props) => {
  const {showAlert} = props //Destructuring
  return (
    <>
      <Notes showAlert={showAlert}/>
    </>
  )
}
export default Home