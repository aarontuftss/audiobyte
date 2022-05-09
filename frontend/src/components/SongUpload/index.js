import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './SongUpload.css';
import * as songActions from "../../store/songs";


function SongUpload() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const userId = sessionUser.id

    const songUrlRegex = new RegExp ('(https:|http:).*(\.mp3)')
    const imageUrlRegex = new RegExp ('(https:|http:).*(\.jpg)')



    if (!sessionUser) return <Redirect to="/" />;

    

    const handleSubmit = (e) => {
        const url1 = imageUrl
        const url2 = songUrl
        
        e.preventDefault();
        if (!imageUrlRegex.test(url1)) {
            setErrors(['please use valid .jpg url'])
            return
        }
        if (!songUrlRegex.test(url2)) {
            setErrors(['please use valid .mp3 url'])
            return
        }

        if(imageUrl === '' || songUrl === '' || name === ''){
            window.alert('Cannot Leave Any Form Items Blank')
            return
        }
        if (name.split('').length > 100){
            setErrors(['Song Name Must Be Shorter Than 100 Characters'])
            return
        }
        const data = {
            name: name,
            artistId: userId,
            image: imageUrl,
            songUrl: songUrl
        }
        console.log(data)

        dispatch(songActions.createSong(data))
        window.location.assign("/home")
    };

    return (
        <div className='mainWrap'>
            <div className='imgDisplay'>
                <h1>Upload Your Track</h1>
                <div className='formDiv'>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <label>
                            Track Name: 
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <br/>
                        <label>
                            Image Url: 
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                
                            />
                        </label>
                        <br/>
                        <label>
                            Song Url: 
                            <input
                                type="text"
                                value={songUrl}
                                onChange={(e) => setSongUrl(e.target.value)}
                                required
                            />
                        </label>
                        <br/>
                        <button type="submit">Upload Song!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SongUpload;