import React, { useEffect } from 'react'

const Alert = ({ type, msg, remove_alert, list }) => {
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      remove_alert()
    }, 3000);

    // clean up function
    return () => clearTimeout(timeout);
  }, [list])

  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert
