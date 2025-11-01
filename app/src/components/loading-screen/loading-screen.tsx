import { ClipLoader } from 'react-spinners'

import { COLORS } from '../../constants/map.constants'
import { UI_TEXT } from '../../constants/ui.constants'

export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <ClipLoader color={COLORS.SPINNER} size={50} />
      <div className="loading-screen-text">{UI_TEXT.LOADING_TEXT}</div>
    </div>
  )
}
