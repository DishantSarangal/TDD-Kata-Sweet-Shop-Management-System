import React from 'react'
import { loadFull } from 'tsparticles'
import Particles from 'react-tsparticles'

export default function ParticlesBg({ className }) {
  const options = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 16, density: { enable: true, area: 800 } },
      color: { value: ['#ffd1dc', '#ffe8a1', '#c1e1ff'] },
      opacity: { value: 0.5 },
      size: { value: { min: 6, max: 14 } },
      move: { enable: true, speed: 0.4, direction: 'bottom', outModes: 'out' },
    },
  }

  const init = async (engine) => {
    await loadFull(engine)
  }

  return <Particles init={init} options={options} className={className} />
}
