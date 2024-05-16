import React from 'react'

const dateformatter = (date) => {
  return (
    new Date(date).toLocaleDateString('en-US',{
        month:'long',
        day:'numeric',
        year:'numeric'
    })
  )
}

export default dateformatter