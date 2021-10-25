import styled from '@emotion/styled'
import React from 'react'

const StyledStatusBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.5rem;
  min-height: 1.5rem;
  font-size: 0.75rem;
  opacity: 0.7;
`

const StatusBarItem = styled.div`
  margin-right: 24px;
  :last-of-type {
    margin-right: 0;
  }
  color: ${({ theme }) => theme.app.foregroundColor};
`

interface Props {}

const StatusBar: React.FC<Props> = ({}: Props) => {
  // const notification = useAppSelector(lastNotification)
  // const documentContent = useAppSelector(documentContentSelector)

  return (
    <StyledStatusBar>
      {/* <StatusBarItem>status: {notification.type}</StatusBarItem> */}
      {/* <StatusBarItem>length: {documentContent.length}</StatusBarItem> */}
    </StyledStatusBar>
  )
}

export default StatusBar
