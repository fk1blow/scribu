import styled from '@emotion/styled'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useKeyPressEvent } from 'react-use'

const StyledInput = styled.input`
  width: 100%;
  height: 38px;
  text-align: center;
  background: transparent;
  outline: none;
  border: none;
`

interface Props {
  value: string
  onChange: (val: string) => void
}

const Path: React.FC<Props> = ({ value, onChange }: Props) => {
  useKeyPressEvent('Escape', () => {
    onChange('')
  })

  return (
    <StyledInput
      autoCorrect="none"
      onChange={(evt) => onChange(evt.target.value)}
      value={value}
    />
  )
}

export default Path
