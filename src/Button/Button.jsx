import"./Button.css"
function Button({handleFunction}) {
    return (
        <button class="Btn" onClick={handleFunction}>
                📝
            <span class="tooltip">Select</span>
        </button>
    )
}

export default Button
