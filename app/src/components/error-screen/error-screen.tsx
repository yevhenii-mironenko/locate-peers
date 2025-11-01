import { UI_ICONS, UI_TEXT } from '../../constants/ui.constants'

type Props = {
  error: Error
}

export function ErrorScreen({ error }: Props) {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="error-screen">
      <div className="error-screen-container">
        <div className="error-screen-icon">{UI_ICONS.WARNING}</div>
        <h1 className="error-screen-title">{UI_TEXT.ERROR_TITLE}</h1>
        <p className="error-screen-message">{UI_TEXT.ERROR_MESSAGE}</p>
        {error.message && (
          <p className="error-screen-details">{UI_TEXT.ERROR_DETAILS(error.message)}</p>
        )}
        <button className="error-screen-button" onClick={handleReload}>
          {UI_TEXT.ERROR_BUTTON}
        </button>
      </div>
    </div>
  )
}
