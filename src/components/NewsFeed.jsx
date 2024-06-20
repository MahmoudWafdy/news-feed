/* eslint-disabled */

import { Typography } from "@mui/material";
import NewsArticle from "./NewsArticle";
import LoadingArticle from "./LoadingArticle";

const NewsFeed = ({ articles, loading }) => {
  if (!loading && !articles.length) {
    return (
      <Typography
        align="center"
        variant="h6"
        marginTop={4}
        color="TextSecondary"
      >
        no articles found
      </Typography>
    );
  }
  return (
    <div>
      {loading &&
        [...Array(5)].map((_, index) => <LoadingArticle key={index} />)}
      {!loading &&
        articles.map((article) => (
          <NewsArticle key={JSON.stringify(article)} {...article} />
        ))}
    </div>
  );
};
export default NewsFeed;
