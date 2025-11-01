import { UI_ICONS, UI_TEXT } from '../../constants/ui.constants'

type Props = {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  resultsCount: number
}

export function InterestFilter({ value, onChange, onClear, resultsCount }: Props) {
  return (
    <div className="interest-filter">
      <div className="interest-filter-container">
        <div className="interest-filter-input-wrapper">
          <span className="interest-filter-icon">{UI_ICONS.SEARCH}</span>
          <input
            type="text"
            className="interest-filter-input"
            placeholder={UI_TEXT.FILTER_PLACEHOLDER}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
          {value && (
            <button
              className="interest-filter-clear"
              onClick={onClear}
              aria-label={UI_TEXT.FILTER_CLEAR_LABEL}
            >
              {UI_ICONS.CLOSE}
            </button>
          )}
        </div>
        {value && (
          <div className="interest-filter-results">{UI_TEXT.FILTER_RESULTS(resultsCount)}</div>
        )}
      </div>
    </div>
  )
}
