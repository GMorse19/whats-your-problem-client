import React from 'react'

import GeneratorCreate from './GeneratorCreate'

const generate = function () {
  console.log('hello')
}

const Generator = () => {
  generate()
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Generator</h1>
      <GeneratorCreate />
    </div>
  )
}

export default Generator
