function getRandomColor() {
    const colors = [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
    ]
    return colors[Math.floor(Math.random()*6)]
  }

export default getRandomColor