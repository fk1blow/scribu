import styled from '@emotion/styled'
import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
} from 'react'
import { Button } from '../../../../ui/atoms'

const StyledButton = styled(Button)<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  width: 100%;
  text-align: left;
  align-items: stretch;
  margin: 0;
  justify-content: space-between;
  background: ${({ selected, theme }) =>
    selected ? theme.commander.highlightColor : 'transparent'};
  font-size: 12px;
  &:hover,
  &:focus {
    cursor: pointer;
    background: ${({ theme }) => theme.commander.highlightColor};
  }
`

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>
  selected?: boolean
}

const ResultListButton: FC<Props> = ({ onClick, selected, children }) => {
  const buttonRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    if (!buttonRef.current || !selected) return
    buttonRef.current.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [selected])

  return (
    <StyledButton
      ref={buttonRef}
      onClick={onClick}
      selected={selected || false}
    >
      {children}
    </StyledButton>
  )
}

export default ResultListButton
