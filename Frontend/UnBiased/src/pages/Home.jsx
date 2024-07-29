import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArticleView } from '../components/ArticleView';
// import articles from '/src/assets/news_test.json'
// import IMAGE from "/src/assets/Poster.png"
import '../App.css';

function Home() {
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({ query: "", page: 0 });
  const query = (searchParams.get('query'));

  const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const format_date_time = (t) => {
    // 2024-07-14T00:27:11Z
    t = t.split("T");
    let date = t[0];
    let time = t[1];
    time = time.replace("Z", "");
    date = date.split("-");
    date[1] = Months[parseInt(date[1] - 1)];
    return `${date[1]} ${date[2]}, ${date[0]} - ${time}`;
  }

  useEffect(() => {
    try {
      let Q = query ? query : "";
      fetch(`http://localhost:8080/quote?query=${Q}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
    catch (err) {
      setError(error);
    }
    // articles.map((item) => {
    //   item.urlToImage = IMAGE;
    // })
    // setData(articles);
    setLoading(false);
  }, [searchParams]);

  // useEffect(() => {
  //   if (selectedArticle) {
  //     setSearchParams({...searchParams, view: "Article" });
  //   }
  //   else {
  //     const newObj = (({ view, ...rest }) => rest)(searchParams);
  //     setSearchParams(newObj )
  //   }
  // }, [selectedArticle])


  // if (error) {
  //   return ;
  // }

  if (selectedArticle) {
    return <ArticleView selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} format_date_time={format_date_time} />
  }

  return (
    <div className="App">
      <Link to="/VerifyBot">Visit Chatbot</Link>
      <form onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (searchText != "") {
          setSearchParams({ query: encodeURIComponent(searchText) });
        }
        else {
          setSearchParams({});
        }
      }}>
        <input type="search" value={searchText} onInput={(e) => setSearchText(e.target.value.slice(0, 500))} disabled={loading} />
        <input type="submit" value="Search" />
      </form>

      {query && <h1> {"Searched for: " + decodeURIComponent(query)}</h1>}

      {error && <div>Error: {error.message}</div>}

      {loading && <div>Loading...</div>}

      {!loading &&
        <ol>
          {(data.length == 0) && <h1 style={{ color: "red" }}>Found Nothing!</h1>}

          {data.map((item, index) => (
            <li key={index} style={{ backgroundImage: `url(${item.urlToImage}` }}>
              <div onClick={() => setSelectedArticle(item)}>
                {item.source.name}
                <h2>{item.title}</h2>
                {format_date_time(item.publishedAt)}
              </div>
            </li>
          ))}
        </ol>
      }
    </div>
  );
}

export default Home;
