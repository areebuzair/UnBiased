export const ArticleView = ({ selectedArticle, setSelectedArticle, format_date_time }) => {
    return <div className="article">
        <input type="button" onClick={() => setSelectedArticle(null)} value="back" />
        <h2>{selectedArticle.title}</h2>
        <h5>{selectedArticle.source.name} - {format_date_time(selectedArticle.publishedAt)}</h5>
        <h4>{selectedArticle.description}</h4>
        <img src={selectedArticle.urlToImage}/>
        <p>{selectedArticle.content}</p>
        <a href={selectedArticle.url} target="_blank">Read more</a>
    </div>
}