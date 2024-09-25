import { useState } from "react";
import { Link } from "react-router-dom";
import { Format_AI_Reply } from "../Utilities/formatter";
import '../verifyBot.css'

export default function VerifyBot() {
    const [Message, setMessage] = useState("");
    const [Reply, setReply] = useState([]);
    const [Loading, setLoading] = useState(false);
    const sendRequest = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!Message) return;
        try {
            fetch(`http://localhost:8017/verifynews?text=${encodeURIComponent(Message)}`)
                .then(response => {
                    setMessage("");
                    setLoading(false);
                    if (!response.ok) {
                        setReply(["Servers could not be reached"]);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setReply(Format_AI_Reply(data.content))
                })
                .catch(error => {
                    console.log(error)
                    throw new Error('Network response was not ok');
                });
        }
        catch (err) {
            setLoading(false);
            console.log(err)
            setReply(["Servers could not be reached. Sorry."]);
        }
    }

    return <div className="verifyBot">
        <Link to="../">Home</Link>
        {(Reply.length!=0) && Reply.map((reply, index) => (
            <p className="AI_Reply" key={index}>
                {reply != "" && reply}
            </p>
        ))}
        <form onSubmit={sendRequest}>
            <textarea onInput={(e) => setMessage(e.target.value)} value={Message} placeholder="What rumour did you hear?"></textarea><br />
            <button disabled={Loading || Message.length==0}>{Loading ? <>Loading...</> : <>Send Message</>}</button>
        </form>
    </div>
}