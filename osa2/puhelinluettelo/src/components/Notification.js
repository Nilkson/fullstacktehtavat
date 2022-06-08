const Notification = (props) => {
    const { message, isError } = props
    if (message === null) {
        return null

        //changes the look of the notification basen on classname
    } else if (isError) {
        console.log("error message ", message);
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        console.log("notification ", message);
        return (
            <div className="notification">
                {message}
            </div>
        )
    }

}

export default Notification