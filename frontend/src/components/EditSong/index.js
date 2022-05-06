import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs";


function EditSong() {
    // const id = window.loc
    const location = window.location.href.split('/')
    const id = location[location.length -1]
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const userId = sessionUser.id


    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        const url1 = imageUrl.split('.')
        const url2 = songUrl.split('.')
        e.preventDefault();
        if (url1[url1.length -1] !== 'jpeg') {
            setErrors(['please use valid .jpeg url'])
            return
        }
        if (url2[url2.length -1] !== 'mp3') {
            setErrors(['please use valid .mp3 url'])
            return
        }
        const data = {
            name: name,
            artistId: userId,
            image: imageUrl,
            songUrl: songUrl,
            id: id
        }
        console.log(data)

        dispatch(songActions.updateSong(data))
        window.location.assign("/home")
    };

    return (
        <div className='mainWrap'>
            <div className='imgDisplay'>
                <h1>Edit Your Track</h1>
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
                        <button type="submit">Publish Edited Version</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditSong;