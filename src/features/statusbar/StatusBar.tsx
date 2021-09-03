import styled from '@emotion/styled'
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { lastNotification } from '../editor/store/selectors'

const StyledStatusBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  min-height: 1.5rem;
  font-size: 0.75rem;

  /* hardcoded */
  /* TODO go through a theme */
  color: #1a1a1aa0;
`

interface Props {}

const StatusBar: React.FC<Props> = ({}: Props) => {
  const notification = useAppSelector(lastNotification)

  return <StyledStatusBar>{notification.type}</StyledStatusBar>
}

export default StatusBar
