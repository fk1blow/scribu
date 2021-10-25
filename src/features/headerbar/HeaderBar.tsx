import styled from '@emotion/styled'
import {
  activeDocumentIdSelector,
  openedDocuments,
} from '@features/documents/store/documents-selectors'
import { switchToDocument } from '@features/documents/store/documents-slice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import React, { useCallback } from 'react'

const StyledHeaderBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  min-height: 2rem;
  font-size: 0.75rem;
`

interface Props {
  // ...
}

const HeaderBar: React.FC<Props> = ({}: Props) => {
  const dispatch = useAppDispatch()

  const documentsTabs = useAppSelector(openedDocuments)
  const activeTabId = useAppSelector(activeDocumentIdSelector)

  const onSwitchTab = useCallback((id: string) => {
    dispatch(switchToDocument(id))
    // console.log('onSwitchTab: ', id)

  }, [])

  return (
    <StyledHeaderBar>
      {documentsTabs.map((tab) => (
        <button key={tab.id} onClick={() => onSwitchTab(tab.id)}>
          {tab.id}
        </button>
      ))}
    </StyledHeaderBar>
  )
}

export default HeaderBar
