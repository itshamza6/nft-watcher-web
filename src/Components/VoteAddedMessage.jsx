import React from 'react'

const VoteAddedMessage = ({message= "hi"}) => {
  return (
    <div style={{background: 'green', borderRadius: 5,border: '.5px solid rgba(0,0,0,0.5)'}}>
      <h6 className="m-0 py-2 text-center">{message}</h6>
    </div>
  )
}

export default VoteAddedMessage;
