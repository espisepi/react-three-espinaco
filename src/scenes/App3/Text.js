import React from 'react'
import { useReflow } from 'react-three-flex'
import { Text as TextImpl } from 'drei'

export default function Text({ bold = false, anchorX = 'left', anchorY = 'top', textAlign = 'left', ...props }) {
  const reflow = useReflow()
  const font = bold ? '/assets/fonts/literata.woff' : '/assets/fonts/literata.woff'
  return <TextImpl anchorX={anchorX} anchorY={anchorY} textAlign={textAlign} font={font} onSync={reflow} {...props} />
}
