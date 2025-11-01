import { UI_ICONS, UI_TEXT } from '../../constants/ui.constants'
import type { User } from '../../types/user'

export const createPopupHtml = (user: User): string => {
  const genderIcon = UI_ICONS[user.sex === 'male' ? 'MALE' : 'FEMALE']

  const interestTags = user.interests
    .map(interest => `<span class="user-popup-interest">${interest}</span>`)
    .join('')

  return `
    <div class="user-popup">
      <div class="user-popup-header">
        <h3 class="user-popup-name">
          <span class="user-popup-gender-icon">${genderIcon}</span>
          ${user.name}
        </h3>
      </div>
      <div class="user-popup-body">
        <div class="user-popup-label">${UI_TEXT.POPUP_INTERESTS_LABEL}</div>
        <div class="user-popup-interests">
          ${interestTags}
        </div>
      </div>
    </div>
  `
}
