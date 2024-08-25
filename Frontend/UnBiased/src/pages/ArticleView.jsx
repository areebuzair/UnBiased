import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import '../Article.css'

export const ArticleView = ({ selectedArticle, format_date_time }) => {

    const [verificationMessage, setVerificationMessage] = useState("");
    const navigateTo = useNavigate();

    useEffect(()=>{
        document.body.scrollIntoView();
    }, [])

    const getVerificationForURL = (URL) => {
        setVerificationMessage("Loading...");
        // setVerificationMessage("This is a test reply\nYo")
        // return;
        fetch(`http://localhost:8017/verifynewsurl?URL=${encodeURIComponent(URL)}`)
        .then(response => {
            if (!response.ok) {
                setVerificationMessage("Servers could not be reached. Sorry.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.content);
            setVerificationMessage(data.content)
        })
        .catch(error => {
            console.log(error)
            throw new Error('Network response was not ok');
            setVerificationMessage("")
        });
    }

    if(!selectedArticle){
        return <Navigate to="../" />
    }

    return <div className="article">
        <a onClick={()=>{navigateTo(-1);}}>Back</a>
        <h2>{selectedArticle.title}</h2>
        <h5>{selectedArticle.source.name} - {format_date_time(selectedArticle.publishedAt)}</h5>
        <h4>{selectedArticle.description}</h4>
        <img src={selectedArticle.urlToImage} />
        <p>{selectedArticle.content}</p>
        <a href={selectedArticle.url} target="_blank">Read more</a>
        {!verificationMessage && <a onClick={() => getVerificationForURL(selectedArticle.url)}>Verify It</a>}
        {verificationMessage && <p className="AI_Reply">{verificationMessage}</p>}
    </div>
}