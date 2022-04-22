import React, { Component } from "react";
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CommentIcon from '@mui/icons-material/Comment';
import { Typography, AppBar, CssBaseline, Grid, Container, Icon, Toolbar } from '@material-ui/core';



class PostComponent extends Component{
        // Constructor
        constructor(props)
        {
            super(props);

            this.state = {
                posts: [],
                comments: [],
                users: [],
                DataisLoaded: false
            }
        }
        

        // ComponentDidMount is used to
        // execute the code
        componentDidMount()
        {
            const group1_url = "https://jsonplaceholder.typicode.com/posts";
            const group2_url = "https://jsonplaceholder.typicode.com/comments";
            const group3_url = "https://jsonplaceholder.typicode.com/users";
            // const fetchPosts = fetch('https://jsonplaceholder.typicode.com/posts'); 
            // const fetchComments = fetch('https://jsonplaceholder.typicode.com/comments');
            // const fetchUsers = fetch('https://jsonplaceholder.typicode.com/users');

            
                    fetch(group1_url)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                        posts: json,
                        })
                    });
                    fetch(group2_url)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                        comments: json,
                        })
                    });
                    fetch(group3_url)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                        users: json,
                        })
                    });
                  
              }
            
            // fetch_data(group1_url, 'group1');
            // fetch_data(group2_url, 'group2');
            // fetch_data(group3_url, 'group3');

                    
                    

            
            

            /*fetch(
                "https://jsonplaceholder.typicode.com/posts")
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        items: json,
                        DataisLoaded: true
                    });
                });*/
            
        
        render() {
            const { DataisLoaded, posts, comments, users } = this.state;
            if (!DataisLoaded)
                return <div>
                    <h1> Pleses wait some time....</h1> </div>;

            return (
                <div>
                  
                    <CssBaseline/>
                        <AppBar position ='relative'>
                        <Toolbar>
                            <Typography variant="h5">Posts List</Typography>
                        </Toolbar>
                        </AppBar>
                        <main>
                        <Container maxWidth="md">
                            <Typography variant="h2" align="center" color="textPrimary">
                                Posts
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Display list of Posts and associated comments!!!
                            </Typography>
                            
                           
                                
                            <List>
                            {posts.map((post) => (
                            <ListItem  key={post.id}>
                                <Box sx={{ width: '100%', color:'black', bgcolor:'dark.main', boxShadow: 1, borderRadius: 2, p: 2}} > 
                                <ListItemText primary={ `Title: ${post.title}`} secondary={`Description: ${post.body}`} gutterbottom = "true"/>
                                {/*<CommentIcon><a href="CommentComponent.js"></a></CommentIcon>*/}
                                    {comments.map((comment) => (
                                        <ol  key={comment.postId}>
                                        <li primary={ `Title: ${comment.name}`} secondary={`Description: ${comment.body}`} gutterbottom = "true"></li>
                                        </ol>
                                    ))}
                                </Box>
                                <Divider />
                            </ListItem>
                            ))}

                            
                            
                            </List>
                            
                            
                            
                        </Container>
                        </main>
                    


                </div>
            );

        }
    }

  export default PostComponent;