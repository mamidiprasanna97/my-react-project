import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import { Typography, AppBar, CssBaseline, Container, Toolbar } from '@material-ui/core';

  


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
                  <dt><h3>{email}</h3></dt>
                  <dd>{body}</dd>
                </dl>
                <Divider/>
              </ListItem>
              
            ))}
            
          </List>
          
          </Box>
          </Container>
        </>
      )}
    </div>
  );
}

function Posts() {

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

 /* sortList = (key)=>{
    let arrayCopy = [...this.state.posts];
    arrayCopy.sort((a,b) => a.name[key] > b.name[key]);
    this.setState({ posts: arrayCopy });
   }*/

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
            {/*<div>
           <button onClick={() => this.sortList()}>Sort Alphabetically</button>
  </div>*/}
            {posts.map((post) => (
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
