import Link from 'next/link'
import React from 'react'

const Mealspage = () => {
  return (
    <main>
        <h1>Mealspage</h1>
        <p><Link href='/meals/share'>Meals Share</Link></p>
    </main>
  )
}

export default Mealspage