import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js'
function Navbar() {
    const {theme, setTheme} = useThemeStore()

    const toggleTheme =async ()=>{
        await setTheme(theme === 'light' ? 'dark':'light')
    }
    const whiteLogo = 'https://res.cloudinary.com/ddvwykjjv/image/upload/v1747051554/contexty-white_bpr9zz.png'
    const blackLogo ='https://res.cloudinary.com/ddvwykjjv/image/upload/v1747051554/contexty-black_qmebfd.png'
  return (
    <div className={`w-full ${theme === 'light' ? 'bg-[rgba(189,189,189,0.8)]' : 'bg-[rgb(26,27,34)]'} transition-all absolute p-5 px-10 lg:px-30 flex flex-row justify-between top-0`}>
        <div>
            <img
            src={`${theme === 'light' ? blackLogo:whiteLogo}`}
            alt='Logo'
            width={25}
            />
        </div>
        <div>
            <div >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div className="w-10 h-5 bg-gray-400 rounded-full peer-checked:bg-gray-700 transition-colors relative">
              <div
                className={`absolute top-1 left-1 w-3 h-3 rounded-full shadow-md duration-300 transition-all ${theme === 'dark' ? "translate-x-5 bg-gray-300" : "bg-gray-600"}`}
              />
            </div>
          </label>
        </div>
        </div>
    </div>
  )
}

export default Navbar