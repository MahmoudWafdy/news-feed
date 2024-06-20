import { useEffect, useRef, useState } from "react";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { debounce } from "lodash";
import { Button, Container, Typography, styled } from "@mui/material";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  // const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const pageNumber = useRef(1);
  const queryValue = useRef("");
  const pageSize = 3;
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");

  async function loadData(currentCategory) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${
        queryValue.current
      }&page=${pageNumber.current}&pageSize=${pageSize}&country=eg&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );
    const data = await response.json();
    if (data.status === "error") {
      throw new Error("wrong somthing occured");
    }
    return data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      author: article.author,
      publishedAt: article.publishedAt,
      image: article.urlToImage,
      url: article.url,
    }));
  }
  const fetchAndUpdateAricle = (currentCategory) => {
    setLoading(true);
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((errorMessage) => setError(errorMessage.message))
      .finally(setLoading(false));
  };

  const debouncedLoadData = debounce(() => fetchAndUpdateAricle, 500);

  useEffect(() => {
    fetchAndUpdateAricle();
  }, []);

  const handleSearchInput = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };
  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateAricle();
  };
  const handlePreviousClick = () => {
    pageNumber.current -= 1;
    fetchAndUpdateAricle();
  };
  const handelCategoryChange = (e) => {
    setCategory(e.target.value);
    pageNumber.current = 1;
    fetchAndUpdateAricle(e.target.value);
  };
  return (
    <Container>
      <NewsHeader
        onSearchChange={handleSearchInput}
        category={category}
        onCategoryChange={handelCategoryChange}
      />
      {error.length === 0 ? (
        <NewsFeed articles={articles} loading={loading} />
      ) : (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <Footer>
        <Button
          variant="outline"
          onClick={handlePreviousClick}
          disabled={loading || pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNextClick}
          disabled={loading || articles.length < pageSize}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
