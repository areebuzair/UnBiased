import { useState, useEffect } from 'react'
import '../Article.css'

export const ArticleView = ({ selectedArticle, setSelectedArticle, format_date_time }) => {

    const [verificationMessage, setVerificationMessage] = useState("");

    useEffect(()=>{
        document.body.scrollIntoView();
    }, [])

    const getVerificationForURL = (URL) => {
        setVerificationMessage("Loading...");
        fetch(`http://localhost:8017/verifynewsurl?URL=${encodeURIComponent(URL)}`)
        .then(response => {
            if (!response.ok) {
                setVerificationMessage("Servers could not be reached. Sorry.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setVerificationMessage(data.content)
        })
        .catch(error => {
            console.log(error)
            throw new Error('Network response was not ok');
            setVerificationMessage("")
        });
    }

    return <div className="article">
        <input type="button" onClick={() => setSelectedArticle(null)} value="back" />
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