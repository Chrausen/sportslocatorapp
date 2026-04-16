import { useDispatch, useSelector } from 'react-redux'
import { selectAddSpotMode, enterAddSpotMode, exitAddSpotMode } from '../../store/uiSlice'
import SportFilter from './SportFilter'
import FindNearestButton from './FindNearestButton'
import './Controls.css'

export default function Controls() {
  const dispatch = useDispatch()
  const addSpotMode = useSelector(selectAddSpotMode)

  return (
    <>
      <div className="controls-overlay">
        <div className="controls-row">
          <SportFilter />
        </div>
        <div className="controls-row" style={{ marginTop: 8 }}>
          <FindNearestButton />
        </div>
      </div>

      <button
        className={`add-spot-fab${addSpotMode ? ' add-spot-fab--cancel' : ''}`}
        onClick={() => dispatch(addSpotMode ? exitAddSpotMode() : enterAddSpotMode())}
        aria-label={addSpotMode ? 'Cancel adding spot' : 'Add a new spot'}
        title={addSpotMode ? 'Cancel' : 'Add new spot'}
      >
        {addSpotMode ? '✕' : '+'}
      </button>
    </>
  )
}
