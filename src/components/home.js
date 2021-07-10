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
        marginTop:"25px",
        padding:"0",
    },
    noMargin:{
        margin:"0"
    },
    noPadding:{
        padding:"0"
    },
    gifPost:{
        textAlign:"center",
        padding:"10px 0px 0px 0px",
        cursor:"pointer",
        "hover":{
            backgroundColor:"rgba(200,200,200,0.2)"
        }
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
        borderRadius: "50px",
        backgroundColor: "rgba(200,200,200, 0.15)",
        '&:hover': {
          backgroundColor: "rgba(200,200,200, 0.25)",
        },
        margin: "15px 24px 15px 24px",
        padding:"5px",        
    },
    inputInput: {
        padding: "2px",
        paddingLeft:"15px",
        width: '100%',
    },
    iconButton:{
        backgroundColor:"rgba(200,200,200, 0.15)", 
        '&:hover': {
            backgroundColor: "rgba(200,200,200, 0.5)",
        },
        marginLeft:"24px", 
        marginRight:"24px", 
        marginTop:"15px",
        padding:"5px"
    },
    normalChip:{

    },
    selectChip:{

    },
    postText:{
        padding:"5px 24px 5px 24px"
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
                <Navbar style={{backgroundColor:"#1771E6"}} />
                <div className="container" style={{maxWidth:"600px"}}>

                    
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
                                    <IconButton style={myStyle.iconButton} onClick={() => {this.setState({isGifPage:false})}}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <h5>
                                        Choose a GIF
                                    </h5>
                                    <div style={myStyle.search}>
                                    
                                        <InputBase
                                            autoFocus
                                            placeholder="Search…"
                                            style={myStyle.inputInput}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                </div>
                                
                                <DialogContent>
                                
                                    <Row>
                                        {this.state.gifs.map((gif, index) => {
                                            return(
                                                <Col key={index} s={12}>
                                                    <img style={{cursor:"pointer"}} width="100%" src={gif} onClick={() => this.setState({currentGif:gif, isGifPage:false})}></img>
                                                </Col>
                                            )
                                        })}
                                        
                                    </Row>
                                </DialogContent>
                            </>
                            :
                            <>
                                <div style={{position:"absolute",right:0, top:0}}>
                                <IconButton style={myStyle.iconButton} onClick={this.handleClose}>
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
                                        autoFocus
                                        id="post-input"
                                        placeholder="What's on your mind?"
                                        value={this.state.currentText}
                                        onChange={(e) => {this.setState({currentText:e.target.value})}}
                                    />
                                    
                                    {this.state.currentGif == ""?null:
                                    <Row>
                                        <Col s={12} style={{textAlign:"center", padding:"0"}}>
                                        <div style={{display: "inline-block",position: "relative", width:"100%"}}>
                                            <div style={{position:"absolute",right:0, top:0}}>
                                                <IconButton style={{backgroundColor:"#D8DADF", margin:"8px", padding:"8px"}} onClick={() => this.setState({currentGif:""})}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            <img style={{borderRadius:"8px"}} width="100%" src={this.state.currentGif}></img>
                                        </div>
                                        </Col>
                                    </Row>
                                    }
                                    
                                    <Chip
                                        icon={<GifIcon />}
                                        label={"GIF"}
                                        clickable
                                        style={this.state.currentGif == ""?myStyle.normalChip:myStyle.selectChip}
                                        onClick={() => {this.setState({isGifPage:true})}}
                                    />
                                </DialogContent>
                                <DialogActions style={{padding:"8px 24px 24px 24px"}}>
                                    <Button disabled={((this.state.currentText == "") && (this.state.currentGif == "") )?true:false} style={myStyle.submitButton} onClick={this.addPost}>
                                        Post
                                    </Button>
                                </DialogActions>
                            </>
                            }
                            
                        </Dialog>
                        {this.state.posts.map((post, index) => {
                            return(
                                <Card className="posts" key={index} style={myStyle.mainCard}>
                                    <Row style={myStyle.noMargin}>
                                        {post.text == ""?null:
                                            <Col s={12} style={myStyle.postText}>
                                                {post.text}
                                            </Col>
                                        }
                                        
                                        {post.gif == ""? null 
                                        :
                                            <Col s={12} style={myStyle.gifPost}>
                                                <img style={{width:"100%"}} src={post.gif}></img>
                                            </Col>
                                        }
                                        
                                    </Row>
                                </Card>
                            )
                        })}
                </div>
            </>
        );
    }
}

export default Home;