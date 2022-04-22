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
                
            }
        }
        

        // ComponentDidMount is used to
        // execute the code
        componentDidMount()
        {
            const fetchPosts = fetch('https://jsonplaceholder.typicode.com/posts'); 
            const fetchComments = fetch('https://jsonplaceholder.typicode.com/comments');
            const fetchUsers = fetch('https://jsonplaceholder.typicode.com/users');

            
            Promise.all([fetchPosts, fetchComments, fetchUsers]).then(values => {
                   
                    return Promise.all(values.map(r => r.json()));
            }).then(dataJSON => this.setState({
                posts: dataJSON[0],
                comments: dataJSON[1],
                users: dataJSON[2]

              }))
        }

            
            

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
            const posts = this.state.posts;
            const comments = this.state.comments;
            const users = this.state.users;


            /*if (!DataisLoaded)
                return <div>
                    <h1> Pleses wait some time....</h1> </div>;*/

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
                                {(() => { 
                                    if(comments.PostId === post.id)
                                    {
                                        console.log(comments.PostId);
                                        
                                        
                                      
                                    }
                                })}
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