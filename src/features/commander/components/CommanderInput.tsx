import styled from '@emotion/styled'
import React, { FC, useCallback, useEffect, useRef } from 'react'

const StyledInput = styled.input`
  height: 2rem;
  padding: 0 1rem;
  border: none;
  outline: none;
  background: none;
  border-bottom-color: ${(props) => props.theme.commander.borderColor};
`

interface Props {
  value: string
  onShouldClose: () => void
  onChange: (val: string) => void
}

const CommanderInput: FC<Props> = ({ value, onChange, onShouldClose }) => {
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const onKeyDown = useCallback((evt) => {
    if (evt.keyCode === 27) {
      onShouldClose()
    }
  }, [])

  return (
    <StyledInput
      onChange={(evt) => onChange(evt.target.value)}
      onKeyDown={onKeyDown}
      ref={inputRef}
      type="text"
      value={value}
      autoCorrect="none"
    ></StyledInput>
  )
}

export default CommanderInput
