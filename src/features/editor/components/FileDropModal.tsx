import styled from '@emotion/styled'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'

const StyledFileDropModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: rebeccapurple;
  /* flex: 1; */
  /* min-height: 0px; */
  /* justify-content: stretch; */
  /* width: 100%; */
`

const StyledDiv = styled.div`
  position: absolute;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  /* visibility: hidden; */
  /* opacity: 0.33; */
  background-color: aqua;

  input {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    /* visibility: hidden; */
  }
`

interface Props {
  children: JSX.Element[]
}

const FileDropModal: React.FC<Props> = ({ children }: Props) => {
  const [dragCounter, setDragCounter] = useState(0)
  const [showInput, setShowInput] = useState(false)

  const onDragEnter = useCallback((evt) => {
    // console.log('enter, evt: ', evt)
    setDragCounter(dragCounter + 1)
  }, [dragCounter])

  const onDragLeave = useCallback(
    (evt) => {
      console.log('leave, evt: ', evt)
      setDragCounter(dragCounter - 1)
    },
    [dragCounter],
  )

  useEffect(() => {
    console.log('dragCounter: ', dragCounter)
    if (dragCounter > 0) {
      setShowInput(true)
    } else {
      setShowInput(false)
    }
  }, [dragCounter])

  const onDragDrop = useCallback((evt) => {
    console.log('evt: ', evt)

  }, [dragCounter])

  return (
    <StyledFileDropModal onDragEnter={onDragEnter} onDragOver={(evt) => evt.preventDefault()}>
      {showInput && (
        <StyledDiv>
          <input
            type="file"
            multiple={false}
            accept=".md"
            onDrop={onDragDrop}
            onDragOver={(evt) => evt.preventDefault()}
            onDragLeave={onDragLeave}
          />
        </StyledDiv>
      )}
      {/* {children} */}
    </StyledFileDropModal>
  )
}

export default FileDropModal
