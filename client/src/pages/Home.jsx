import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import { useThemeStore } from '../store/useThemeStore.js'
import { useTextStore } from '../store/useTextStore.js'
import toast from 'react-hot-toast'
import { Loader2, Copy } from 'lucide-react'

function Home() {
  const { theme } = useThemeStore()
  const { chechGrammer,paraphrase, checkingGrammer,paraphrasing } = useTextStore()
  const [selected, setSelected] = useState('grammer')
  const [text, setText] = useState('')
  const [response, setResponse] = useState('')
  const [wordCount,setWordCount] = useState(0)
  const [reswordCount,setResWordCount] = useState(0)
  const [word2Count,setWord2Count] = useState(0)
  const [res2wordCount,setRes2WordCount] = useState(0)
  const [text2, setText2] = useState('')
  const [response2, setResponse2] = useState('')

  useEffect(()=>{
    const words = text.trim().match(/\b\w+\b/g);
    setWordCount(words ? words.length : 0)
  },[text])
  useEffect(()=>{
    const words = text2.trim().match(/\b\w+\b/g);
    setWord2Count(words ? words.length : 0)
  },[text2])

  const handlecheck = async (e) => {
    e.preventDefault()
    try {
      const reply = await chechGrammer(text)
      if (reply.status === 200) {
        setResponse(reply.data)
        const words = reply.data.trim().match(/\b\w+\b/g)
        setResWordCount(words ? words.length : 0)
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleRephrase = async(e)=>{
 e.preventDefault()
    try {
      const reply = await paraphrase(text2)
      if (reply.status === 200) {
        setResponse2(reply.data)
        const words = reply.data.trim().match(/\b\w+\b/g)
        setRes2WordCount(words ? words.length : 0)
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  return (
    <div className='min-h-screen relative'>
      <Navbar />
      <div className='pt-20 pb-20 overflow-hidden'>
        <div className='flex justify-center items-center'>
          <div className='relative flex felx-row gap-10 p-5 justify-center items-center border-b-2 w-96'>
            <button onClick={() => { setSelected('grammer') }} className='cursor-pointer'>Grammer</button>
            <button onClick={() => { setSelected('paraphrase') }} className='cursor-pointer'>Paraphrase</button>
            <p className={` absolute w-30 h-13 bg-base-300 -z-10 ${selected === 'grammer' ? 'left-18' : 'left-46'} transition-all`} />
          </div>
        </div>
        <div className='relative w-full flex justify-center items-center mt-20 gap-10'>
          {/*checker */}
          <div className={`absolute w-[80%] h-full flex justify-center items-center ${selected === 'grammer' ? '' :'-translate-x-96 scale-[0]'} transition-all duration-700`}>
            <div className='flex flex-col lg:flex-row gap-10 w-full lg:w-[90%] justify-center items-center'>
              <div className='flex flex-col gap-2  w-full lg:w-[50%] justify-center items-center'>
                <textarea
                  className='resize-none bg-base-200 h-96 w-[90%] lg:w-96 p-3 border-1 rounded-md'
                  value={text}
                  placeholder='Enter text here'
                  onChange={(e) => { setText(e.target.value) }}
                />
                <p className='pl-2 w-[90%] lg:w-96'>Word Count: {wordCount}</p>
                
              </div>
              {checkingGrammer ? <button className='btn btn-success w-24' ><Loader2 className='animate-spin' /></button> : <button className='btn btn-success w-24' onClick={handlecheck}>Check</button>}
              <div className='relative w-full  lg:w-[50%] flex flex-col gap-2 justify-center items-center '>
                <div className=" flex flex-col w-[90%] lg:w-96 h-96 border-2 rounded-md bg-base-200 overflow-hidden justify-center item">
                  <textarea
                    readOnly
                    className="w-full h-full resize-none p-3 bg-transparent outline-none cursor-default"
                    value={response}
                    placeholder="Enter a prompt and click Check"
                  />
                  
                </div>
                <p className='w-[90%] lg:w-96 pl-2'>Word Count:{reswordCount}</p>
                {response && <button className="absolute -bottom-2 right-[45%]  text-sm inline-flex justify-end bg-transparent hover:scale-110 active:scale-100 cursor-pointer" 
                title='Copy-text'
                onClick={()=>{navigator.clipboard.writeText(response);toast.success('Text Copied')}}
                >
                  <Copy size={35} className='p-2' />
                </button>}
              </div>
            </div>
          </div>
          {/*paraphraser */}
          <div className={`w-[80%] h-full flex justify-center items-center ${selected === 'grammer' ? 'translate-x-96 scale-[0]' :''} transition-all duration-700`}>
            <div className='flex flex-col lg:flex-row gap-10 w-full lg:w-[90%] justify-center items-center'>
              <div className='flex flex-col gap-2 w-full lg:w-[50%] justify-center items-center'>
                <textarea
                  className='resize-none bg-base-200 h-96 w-[90%] lg:w-96 p-3 border-1 rounded-md'
                  value={text2}
                  placeholder='Enter text here'
                  onChange={(e) => { setText2(e.target.value) }}
                />
                <p className='pl-2 w-[90%] lg:w-96'>Word Count: {word2Count}</p>
                
              </div>
              {paraphrasing ? <button className='btn btn-info w-24' ><Loader2 className='animate-spin' /></button> : <button className='btn btn-info w-24' onClick={handleRephrase}>Paraphrase</button>}
              <div className='relative w-full  lg:w-[50%] flex flex-col gap-2 justify-center items-center '>
                <div className=" flex flex-col w-[90%] lg:w-96 h-96 border-2 rounded-md bg-base-200 overflow-hidden justify-center item">
                  <textarea
                    readOnly
                    className="w-full h-full resize-none p-3 bg-transparent outline-none cursor-default"
                    value={response2}
                    placeholder="Enter a prompt and click Check"
                  />
                </div>
                <p className='w-[90%] lg:w-96 pl-2'>Word Count:{res2wordCount}</p>
                {response2 && <button className="absolute -bottom-2 right-[45%]  text-sm inline-flex justify-end bg-transparent hover:scale-110 active:scale-100 cursor-pointer" 
                title='Copy-text'
                onClick={()=>{navigator.clipboard.writeText(response2);toast.success('Text Copied')}}
                >
                  <Copy size={35} className='p-2' />
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`custom-shape-divider-bottom-1745687357 relative lg:absolute -z-10`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={`${theme === 'light' ? 'fill-[rgba(189,189,189,0.8)]' : 'fill-[rgb(26,27,34)]'} transition-all `}></path>
        </svg>
      </div>
    </div>
  )
}

export default Home