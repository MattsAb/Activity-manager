type ErrorMessageProps = {
    errorMessage: string
}

function ErrorMessageComponent ({errorMessage}: ErrorMessageProps) {

    if (errorMessage === "") return

    return (
        <p className="text-red-500 text-base">{errorMessage}</p>
    )
}

export default ErrorMessageComponent