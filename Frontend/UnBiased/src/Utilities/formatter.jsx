const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const format_date_time = (t) => {
    // 2024-07-14T00:27:11Z
    t = t.split("T");
    let date = t[0];
    let time = t[1];
    time = time.replace("Z", "");
    date = date.split("-");
    date[1] = Months[parseInt(date[1] - 1)];
    return `${date[1]} ${date[2]}, ${date[0]} - ${time}`;
}

export const Format_AI_Reply = (reply) => {
    reply = reply.replace("\\t", " ")
    reply = reply.split("\\n")
    for(let i=0; i<reply.length; i++){
        reply[i] = reply[i].replace("\\", "");
    }
    return reply;
}