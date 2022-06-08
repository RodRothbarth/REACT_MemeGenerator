import '../App.css'
import {EffectCallback, useCallback, useEffect, useState} from "react";

interface Memes {
    box_count: number,
    height: number,
    id: string
    name: string
    url: string
    width: number
}

export default function Form(){
    const [meme, setMeme] = useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemesData, setAllMemesData] = useState([])

    const memesFetch = useCallback(async () => {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const memesData = await res.json()
        return memesData.data;
    }, [])

    useEffect(() =>{
        memesFetch().then(memeData=> setAllMemesData(memeData.memes))
    }, [])

    function addPhoto() {
        const memesArray: Array<Memes> = allMemesData
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMemes=> {
            return {...prevMemes,
                randomImage: url}
        })
    }

    function handleChange(event: any){
        const {name, value}:{name: string; value: string} = event.target
            setMeme(prevMeme => ({
                ...prevMeme,
                [name]: value
            }))
    }

    return(
        <main>
            <div className="form--container">
                    <input
                        className="form--input"
                        placeholder="Top text"
                        type="text"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}/>
                    <input
                        className="form--input"
                        placeholder="Bottom text"
                        type="text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}/>
                    <button
                        onClick={addPhoto}
                        className="form--button">
                        Get a new meme image  🖼
                    </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>

    )
}
