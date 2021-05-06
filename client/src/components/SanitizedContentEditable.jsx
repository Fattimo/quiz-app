import ContentEditable from "react-contenteditable"

// https://www.taniarascia.com/content-editable-elements-in-javascript-react/
const SanitizedContentEditable = (props) => {
    const {className, html, onChange} = props

    const pasteAsPlainText = (event) => {
        event.preventDefault()
      
        const text = event.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
    }

    const trimSpaces = (string) => {
        return string
          .replace(/&nbsp;/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
    }

    const handleChange = (e) => {
        onChange(trimSpaces(e.target.value))
    }

    const disableNewlines = (event) => {
        const keyCode = event.keyCode || event.which
      
        if (keyCode === 13) {
          event.returnValue = false
          if (event.preventDefault) event.preventDefault()
        }
    }

    const highlightAll = () => {
        setTimeout(() => {
          document.execCommand('selectAll', false, null)
        }, 0)
      }

    return (
        <ContentEditable 
            className={className}
            html={html || '&nbsp;'}
            onChange={handleChange}
            onPaste={pasteAsPlainText}
            onKeyPress={disableNewlines}
            onFocus={highlightAll}
        />
    )
}

export default SanitizedContentEditable