import { useState } from 'react';
import './App.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [lenght, setlength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [symAllow, setSymAllow] = useState(false);
  const passRef = useRef(null);
  const [password, setpassword] = useState(' ');
  const generate = useCallback(() => {
    let pass = ' ';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numAllow) str += '1234567890';
    if (symAllow) str += '!@#$%^&*()_+-';
    for (let i = 0; i < lenght; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    return setpassword(pass);
  }, [symAllow, numAllow, lenght]);

  useEffect(() => {
    generate();
  }, [generate, symAllow, numAllow]);
  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current.select();
    // alert('copied');
  };

  return (
    <>
      <div className='h-screen  flex  justify-center items-center'>
        <div className=' flex flex-col justify-center  h-fit bg-slate-200 p-8 rounded-md  '>
          <h1 className=' text-blue-950 text-center text-2xl font-sans p-4 m-4 font-bold'> password generator</h1>

          <div className='flex  justify-center p-4 '>
            <input
              type='text'
              name=''
              id=''
              className='p-4 outline-4 rounded-l-md '
              placeholder='password'
              value={password}
              readOnly
              ref={passRef}
            />
            <button className=' bg-blue-950 rounded-r-md p-4 font-bold text-white' onClick={copyPassword}>
              {' '}
              copy
            </button>
          </div>
          <div className='flex  justify-center'>
            <input
              type='range'
              min='8'
              max='20'
              value={lenght}
              id='range'
              className=' cursor-pointer p-2   '
              onChange={(e) => setlength(e.target.value)}
            />
            <label htmlFor='range' className='p-2 text-blue-950 font-medium'>
              Length : {lenght}
            </label>
          </div>
          <div className='flex  justify-center'>
            <input
              type='checkbox'
              defaultChecked={numAllow}
              name=''
              className='p-2 outline-2 m-2 bg-slate-200 rounded-md '
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label className='p-2 text-blue-950 font-medium'>Numbers</label>
            <input
              type='checkbox'
              defaultChecked={symAllow}
              name=''
              className='p-2 outline-2 m-2 bg-slate-200 rounded-md  '
              onChange={() => {
                setSymAllow((prev) => !prev);
              }}
            />
            <label className='p-2 text-blue-950 font-medium'>symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
