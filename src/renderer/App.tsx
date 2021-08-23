import React, { useCallback, useEffect } from 'react'
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom'
import './App.global.css'
import TitleBar from '@features/titlebar/components/Titlebar'
import { useElectron } from './lib/use-electron'

export default function App() {
  const { on } = useElectron()

  useEffect(
    () =>
      on('open_search_commander', () => {
        console.log('should open search commander')
      }),
    [],
  )

  return (
    <Router>
      <TitleBar />
      {/* <Switch>
        <Route path="/" component={Hello} />
      </Switch> */}
    </Router>
  )
}
