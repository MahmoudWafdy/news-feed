/* eslint-disabled*/

import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledCard } from "./StyledCard";

const linkStyle = {
  textDecoration: "none",
  color: "rgba(0, 0, 0, 0.8)", // You can change this to any color you like
};
function NewsArticle(props) {
  const { image, title, description, author, publishedAt, url } = props;
  return (
    <StyledCard>
      <a target="_blank" href={url} style={linkStyle}>
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="Sample article"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
export default NewsArticle;
