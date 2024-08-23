import { useState } from "react";
import { Link } from "react-router-dom";
import '../verifyBot.css'

export default function VerifyBot() {
    const [Message, setMessage] = useState("");
    const [Reply, setReply] = useState("");
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
                        setReply("Servers could not be reached");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setReply(data.content)
                })
                .catch(error => {
                    console.log(error)
                    throw new Error('Network response was not ok');
                });
        }
        catch (err) {
            setLoading(false);
            console.log(err)
            setReply("Servers could not be reached");
        }
    }

    return <div className="verifyBot">
        <Link to="../">Home</Link>
        {Reply && <h3>{Reply}</h3>}
        <form onSubmit={sendRequest}>
            <textarea onInput={(e) => setMessage(e.target.value)} value={Message}></textarea><br />
            <button disabled={Loading}>{Loading ? <>Loading...</> : <>Send Message</>}</button>
        </form>
    </div>
}