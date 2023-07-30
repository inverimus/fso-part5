const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <p className={message.type}>
      {message.text}
    </p>
  )
}

export default Notification