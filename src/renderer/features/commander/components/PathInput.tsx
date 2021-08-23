import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useKeyPressEvent } from 'react-use'

const StyledInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0;
  text-align: center;
  background: transparent;
  outline: none;
  border: none;

  &:focus {
    background: #ECECEC;
  }
`

interface Props {
  value: string
  onChange: (val: string) => void
}

const Path: React.FC<Props> = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useKeyPressEvent('Escape', () => {
    onChange('')
    inputRef.current?.blur()
  })

  return (
    <StyledInput
      ref={inputRef}
      autoCorrect="none"
      onChange={(evt) => onChange(evt.target.value)}
      value={value}
    />
  )
}

export default Path
