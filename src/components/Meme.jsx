import React from 'react'
//import memes from '../memes.js'
export default function(){


    const [meme,setMeme] = React.useState({
        top : '',
         bottom : '',
          imageUrl : ''
    })
    const [allMeme, setAllMeme] = React.useState([])
   // const [memeImage, setMemeImage] = useState('')

    function getMeme(){
        
        const rand = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[rand].url
        setMeme(meme => {
            return{
                ...meme,
                imageUrl: url
            }
        })
    }

    function clickHandler(event){
        const {name, value} = event.target
        setMeme((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    React.useEffect(() => {
        async function getMem(){
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMeme(data.data.memes)
    }
    getMem()
    }, [])
    

    return(
        <div className="main">
            <form className="form-container">
                <input type="text" name="top" value = {meme.top} onChange={clickHandler} id="" className="top" placeholder="Top Text" />
                <input type="text" name="bottom" value={meme.bottom} onChange= {clickHandler} id="" className="bottom" placeholder="Bottom Text"/>
            </form>
            <button className="newImg"
            onClick={getMeme}
            >Get a new meme image</button>
            <div className="meme">
                <h1 className='memeText top'>{meme.top}</h1>
            <img src={meme.imageUrl} alt="" className='memeImg'/>
                <h1 className='memeText bottom'>{meme.bottom}</h1>

            </div>
        </div>
    )
}