import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import { Typography, AppBar, CssBaseline, Grid, Container, Icon, Toolbar } from '@material-ui/core';



const fetchComments = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return response.json();
};

function Post({ title, body, postId }) {
  const [comments, setComments] = useState([]);

  const clickHandler = () => {
    fetchComments(postId).then(setComments);
  };

  return (
    <div>
      <h1 >{title}</h1>
      <p>{body}</p>
      <CommentIcon onClick={clickHandler}/>
      {comments.length && (
        <>
           <Container maxWidth="md">
           <Box sx={{ width: '100%', color:'black', bgcolor:'dark.main', boxShadow: 1, borderRadius: 2, p: 2}} > 
          Comments:
          <List>
            {comments.map(({ id, email, body }) => (
              <ListItem key={id}>
                <dl>
                  <dt>{email}</dt>
                  <dd>{body}</dd>
                </dl>
              </ListItem>
              
            ))}
          </List>
          <Divider/>
          </Box>
          </Container>
        </>
      )}
    </div>
  );
}

function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadposts = async () => {
      const resp = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await resp.json();
      setPosts(data);
    };
    loadposts();
  }, []);

  return (
          <>
          <CssBaseline/>
            <AppBar position ='relative'>
            <Toolbar>
                <Typography variant="h5">Posts List</Typography>
            </Toolbar>
            </AppBar>
            <Typography variant="h2" align="center" color="textPrimary">
                Pots
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  Display list of Posts and associated comments!!!
              </Typography>
             
        
       
            <main>
            <Container maxWidth="md">
            <input 
            type="text" 
            placeholder="Filter"
            onChange={(event)=>
              {setSearchTerm(event.target.value);}} 
            value=''  className="input" />
            <br></br>
            {posts.filter((post)=>{
              if(searchTerm === "")
              {
                return post;
              } else if(post.title.toLowerCase.includes(searchTerm.toLowerCase())){
                return post;
              }
            }).map((post) => (
                   <Box sx={{ width: '100%', color:'black', bgcolor:'dark.main', boxShadow: 2, borderRadius: 2, p: 2}} > 
           <List key={post.id}>
             <ListItem>
                <Post postId={post.id} title={post.title} body={post.body} />
            </ListItem>
          </List>
          
          </Box>
          
        ))}
      
      </Container>
      </main>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Posts />
    </div>
  );
}
