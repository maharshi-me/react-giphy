import React, { Component } from 'react';
import { Navbar, Row, Col, Card, CardTitle, Icon, Button, Textarea} from 'react-materialize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GifIcon from '@material-ui/icons/Gif';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import './home.css';

const myStyle = {
    mainCard:{
        borderRadius:"8px",
        marginTop:"25px"
    },
    noMargin:{
        margin:"0"
    },
    noPadding:{
        padding:"0"
    },
    gifPost:{
        textAlign:"center",
        padding:"10px 0px 0px 0px"
    },
    formBox:{
        padding:"10px 15px",
        backgroundColor:"#F0F2F5", 
        borderRadius:"50px", 
        cursor:"pointer"
    },
    submitButton:{
        width:"100%", 
        borderRadius:"8px", 
        backgroundColor:"#1771E6"
    },
    search: {
        position: 'relative',
        borderRadius: "8px",
        backgroundColor: "rgba(200,200,200, 0.15)",
        '&:hover': {
          backgroundColor: "rgba(200,200,200, 0.25)",
        },
        marginLeft: 0,
        padding:"5px",
        width: '100%',
        
    },
    inputInput: {
        padding: "2px 2px 2px 0px",
        // vertical padding + font size from searchIcon
        width: '100%',
    }
    
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            isGifPage:false,
            currentText:"",
            currentGif:"",
            gifs:[],
            posts:[
                {
                    "text":"This is default post",
                    "gif":""
                },
            ]
        }
    }
    componentDidMount(){
        fetch('https://api.giphy.com/v1/gifs/trending?api_key=EQh0DeRaL6DoipBy8vrLyDzp1hF7f2ej&limit=12&rating=g')
        .then(response => response.json())
        .then(data => 
            {
                let gifs = []
                data.data.forEach(gif => {
                    gifs = [...gifs, gif["images"]["original"]["url"]]
                });
                this.setState({gifs:gifs})
            });
    }
    handleClose = () => {
        this.setState({open:false})
    }
    addPost = () => {
        this.setState({posts:[{text:this.state.currentText,gif:this.state.currentGif}, ...this.state.posts], currentText:"", currentGif:"", open:false})
    }
    render() {
        console.log(this.state)
        return (
            <>
                <Navbar style={{backgroundColor:"white"}} />
                <div className="container">
                    <div className="container">
                        <Card style={myStyle.mainCard}>
                            <Row style={myStyle.noMargin}>
                                <Col s={12} style={myStyle.noPadding}>
                                    <div style={myStyle.formBox} onClick={() => this.setState({open:true, isGifPage:false})}>
                                        What's on your mind?
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            {this.state.isGifPage
                            ?
                            <>
                                <div style={{position:"absolute", left:0, top:0}}>
                                    <IconButton style={{backgroundColor:"#D8DADF", margin:"8px", padding:"8px"}} onClick={() => {this.setState({isGifPage:false})}}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <h5>
                                        Choose a GIF
                                    </h5>
                                </div>
                                
                                <DialogContent>
                                <div style={myStyle.search}>
                                    
                                    <InputBase
                                        placeholder="Search…"
                                        style={myStyle.inputInput}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <Row>
                                    {this.state.gifs.map((gif, index) => {
                                        return(
                                            <Col key={index} s={6}>
                                                <img width="100%" src={gif} onClick={() => this.setState({currentGif:gif, isGifPage:false})}></img>
                                            </Col>
                                        )
                                    })}
                                    
                                </Row>
                                </DialogContent>
                            </>
                            :
                            <>
                                <div style={{position:"absolute",right:0, top:0}}>
                                <IconButton style={{backgroundColor:"#D8DADF", margin:"8px", padding:"8px"}} onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <h5>
                                        Create Post
                                    </h5>
                                </div>
                                
                                <DialogContent>
                                    <Textarea
                                        id="post-input"
                                        placeholder="What's on your mind?"
                                        value={this.state.currentText}
                                        onChange={(e) => {this.setState({currentText:e.target.value})}}
                                    />
                                    
                                    {this.state.currentGif == ""?null:
                                    <Row>
                                        <Col s={12}>
                                        <div style={{display: "inline-block",position: "relative"}}>
                                            <div style={{position:"absolute",right:0, top:0}}>
                                                <IconButton style={{backgroundColor:"#D8DADF", margin:"8px", padding:"8px"}} onClick={() => this.setState({currentGif:""})}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            <img width="100%" src={this.state.currentGif}></img>
                                        </div>
                                        </Col>
                                    </Row>
                                    }
                                    
                                    <Chip
                                        icon={this.state.currentGif == ""?<AddIcon />:null}
                                        label={this.state.currentGif == ""?"Add GIF":"Change GIF"}
                                        clickable
                                        color={this.state.currentGif == ""?"":"primary"}
                                        onClick={() => {this.setState({isGifPage:true})}}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button disabled={((this.state.currentText == "") && (this.state.currentGif == "") )?true:false} style={myStyle.submitButton} onClick={this.addPost}>
                                        Post
                                    </Button>
                                </DialogActions>
                            </>
                            }
                            
                        </Dialog>
                        {this.state.posts.map((post, index) => {
                            return(
                                <Card key={index} style={myStyle.mainCard}>
                                    <Row style={myStyle.noMargin}>
                                        <Col s={12} style={myStyle.noPadding}>
                                            {post.text}
                                        </Col>
                                        {post.git == ""? null 
                                        :
                                            <Col s={12} style={myStyle.gifPost}>
                                                <img style={{maxWidth:"100%"}} src={post.gif}></img>
                                            </Col>
                                        }
                                        
                                    </Row>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default Home;