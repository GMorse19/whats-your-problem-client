import React, { useState } from 'react'
// import axios from 'axios'
import { withRouter } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
import GeneratorForm from './GeneratorForm.js'

const GeneratorCreate = props => {
  const [generator, setGenerator] = useState({
    name: '',
    pet: '',
    location: ''
  })
  const [answer, setAnswer] = useState({ sentence: '' })

  const handleChange = event => {
    event.persist()
    setGenerator({ ...generator, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('handle submit!!' + generator.name)
    const nouns = ['bird', 'clock', 'boy', 'plastic',
      'duck', 'teacher', 'old lady', 'professor',
      'hamster', 'dog']
    const verbs = ['kick', 'run', 'fly', 'dodge',
      'slice', 'roll', 'die', 'breathe', 'sleep',
      'kill']
    const adjectives = ['beautiful', 'lazy', 'professional',
      'lovely', 'dumb', 'rough', 'soft', 'hot', 'vibrating',
      'slimy']
    const adverbs = ['slowly', 'elegantly', 'precisely', 'quickly',
      'sadly', 'humbly', 'proudly', 'shockingly', 'calmly', 'passionately']
    // nconst preposition = ['down', 'into', 'up', 'on', 'upon', 'below', 'above', 'through', 'across', 'towards']

    const number = (Math.floor(Math.random() * 100) + 1)
    const secondNumber = (Math.floor(Math.random() * 100) + 1)
    const mainVerb = verbs[Math.floor(Math.random() * verbs.length)]
    const mainNoun = nouns[Math.floor(Math.random() * nouns.length)]
    // const phrase = ['is', 'can', 'will']
    // const randoArray = phrase[Math.floor(Math.random() * phrase.length)]
    const rando = function (arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
    const content = generator.name + ' earns $' +
        number + ' an hour by ' + mainVerb + 'ing ' + mainNoun + 's' +
        '. He/She ' + rando(verbs) + 's ' + rando(nouns) + 's ' + rando([1, 2, 6, 10]) + ' ' + rando(adjectives) +
        ' ' + rando(nouns) +
        's each week, for ' + secondNumber + ' hours at a ' + rando(nouns) + '. After ' +
        rando(adverbs) + ' ' + rando(verbs) + 'ing ' + rando(nouns) + 's for ' + number + ' ' + rando(nouns) + 's, how much ' +
        mainNoun + 's will ' + generator.name + ' ' + mainVerb + ' in ' + generator.location + '?'

    setAnswer(content)

    console.log(answer)
  }
  console.log(answer)
  return (
    <div className="generator-board">
      <GeneratorForm
        generator={generator}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
      <h1>Answer:<br /> {[...answer]}</h1>
    </div>
  )
}

export default withRouter(GeneratorCreate)
