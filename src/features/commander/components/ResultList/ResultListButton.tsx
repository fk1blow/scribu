import styled from '@emotion/styled'
import React, {
  ButtonHTMLAttributes,
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
  background: transparent;
  align-items: stretch;
  justify-content: space-between;
  background: ${({ selected, theme }) =>
    selected ? theme.commander.highlightColor : 'transparent'};
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
