'use client'
import {
  useState
} from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)


  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query)
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  return (
    <main className="w-full flex flex-col items-center justify-between p-24">
      <h1 className='text-7xl font-bold mb-6' ><span className='text-[rgb(0,0,255)]'>SAYLANI</span><span className='text-[#2fce2f]'> CHATBOT</span></h1>
      <input className='text-black px-4 text-xl outline-none py-1 border border-black w-6/12 h-12 rounded-full' onChange={e => setQuery(e.target.value)} />
      <button className="px-7 py-1 w-60 h-12 text-xl font-bold rounded-2xl bg-[#2fce2f] text-white mt-8 mb-2 " onClick={sendQuery}>Ask Me</button>
      {
        loading && <p className='mt-6'>Loading...</p>
      }
      {
        result && <p className='mt-6'>{result}</p>
      }
      {/* <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button> */}
    </main>
  )
}
