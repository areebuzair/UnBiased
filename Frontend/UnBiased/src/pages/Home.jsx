import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import articles from '/src/assets/news_test.json'
// import IMAGE from "/src/assets/Poster.png"
import '../App.css';

function Home({ setSelectedArticle, format_date_time }) {
  const [data, setData] = useState([]);
  // const [selectedArticle, setSelectedArticle] = useState(null);


/*
  const Options = ["Arts", "Science", "Entertainment", "Sports", "Politics", "Business"];
  const [selectedOptions, setSelectedOptions] = useState(localStorage.getItem("selected-options"));
*/

  const [searchParams, setSearchParams] = useSearchParams({ query: "", page: 0 });
  //This text shows up in the URL and is searched
  const query = (searchParams.get('query'));
  
  //This text shows up inside the search bar
  // const [searchBarText, setSearchBarText] = useState(query);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Navigate = useNavigate();

  const handleSearchBarSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (searchBarText != "") {
      setSearchParams({ query: encodeURIComponent(searchBarText) });
    }
    else {
      setSearchParams({});
    }
    getNewsArticles();
  }

  const getNewsArticles = () => {
    setLoading(true);
    setError(null);
    try {
      let Q = encodeURIComponent(query);
      fetch(`http://localhost:8017/quote?query=${Q}`)
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
      setLoading(false);
    }
    // articles.map((item) => {
    //   item.urlToImage = IMAGE;
    // })
    // setData(articles);

  }

  useEffect(() => {
    getNewsArticles();
  }, [searchParams]);

  const showArticle =(item)=> {
    setSelectedArticle(item);
    Navigate("/ReadArticle");
  }

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

  // if (selectedArticle) {
  //   return <ArticleView selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} format_date_time={format_date_time} />
  // }

  return (
    <div className="App">

      {/* <Link to="/VerifyBot">Visit Chatbot</Link> */}

      {/* <form onSubmit={(e) => { handleSearchBarSubmit(e); }}>
        <input type="search" value={searchBarText} onInput={(e) => setSearchBarText(e.target.value.slice(0, 400))} disabled={loading} />
        <input type="submit" value="Search" />
      </form> */}

      {query && <h1> {"Searched for: " + decodeURIComponent(query)}</h1>}

      {error && <div>Error: {error.message}</div>}

      {loading && <div>Loading...</div>}

      {!loading &&
        <ol>
          {(data.length == 0) && <h1 style={{ color: "red" }}>Found Nothing!</h1>}

          {data.map((item, index) => (
            <li key={index} style={{ backgroundImage: `url(${item.urlToImage}` }}>
              <div onClick={() => showArticle(item)}>
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
