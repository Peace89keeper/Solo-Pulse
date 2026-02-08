import app from './app.js'

const PORT = process.env.PORT || 3000  // Fallback to 4000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on:`)
  console.log(`   http://localhost:${PORT}`)
  console.log(`   http://127.0.0.1:${PORT}`)
})

