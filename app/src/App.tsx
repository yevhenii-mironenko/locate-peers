import { ErrorBoundary } from './components/error-boundary/error-boundary'
import { Map } from './components/map/map'

function App() {
  return (
    <ErrorBoundary>
      <Map />
    </ErrorBoundary>
  )
}

export default App
