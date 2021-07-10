import React, { Component, useState } from 'react';
import { Navbar, Row, Col, Card, Button, Textarea, Preloader} from 'react-materialize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import GifIcon from '@material-ui/icons/Gif';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@material-ui/core/InputBase';
import './home.css';

const GiphyApiKey = "EQh0DeRaL6DoipBy8vrLyDzp1hF7f2ej"

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
        marginLeft:"24px", 
        marginRight:"24px", 
        marginTop:"15px",
        padding:"5px",
    },
    iconButtonHover:{
        backgroundColor: "rgba(200,200,200, 1)",
        marginLeft:"24px", 
        marginRight:"24px", 
        marginTop:"15px",
        padding:"5px",
    },
    removeGifButton:{
        backgroundColor:"rgba(255,255,255, 0.95)", 
        marginLeft:"24px",
        marginRight:"24px", 
        marginTop:"15px",
        padding:"5px",
    },
    normalChip:{

    },
    selectChip:{

    },
    postText:{
        padding:"5px 24px 5px 24px"
    }
    
}

const SmallIconButton = (props) => {
    const [Hovered, setHovered] = useState(false);
    return(
        <IconButton 
            style={Hovered?myStyle.iconButtonHover:myStyle.iconButton} 
            onClick={props.onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {props.icon}
        </IconButton>
    )
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            isGifPage:false,
            currentText:"",
            currentGif:"",
            gifQuery:"",
            gifsLoading:false,
            gifs:[],
            posts:[
                {
                    "text":"This is default post",
                    "gif":""
                },
            ]
        }
        this.controller = null
    }
    componentDidMount(){
        this.fetchTrendingGifs();
    }
    fetchTrendingGifs(){
        const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${GiphyApiKey}&limit=12&rating=g`
        this.setState({gifsLoading:true})
        fetch(trendingUrl)
        .then(response => response.json())
        .then(data => 
            {
                let gifs = []
                data.data.forEach(gif => {
                    gifs = [...gifs, {small:gif["images"]["downsized_medium"]["url"],original:gif["images"]["downsized_medium"]["url"]}]
                });
                this.setState({gifs:gifs, gifsLoading:false})
            })
        .catch(function(err) {
            console.error(` Err: ${err}`);
        });
    }
    handleGifQueryChange = (e) => {
        this.setState({gifQuery:e.target.value, gifsLoading:true})
        // const controller = new AbortController()
        // const signal = controller.signal
        if (this.controller){
            this.controller.abort()
        }
        if (e.target.value === ""){
            this.fetchTrendingGifs();
            return
        }
        this.controller = new AbortController()
        const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${GiphyApiKey}&limit=12&rating=g&q=${e.target.value}`
        fetch(searchUrl,{method:"get", signal:this.controller.signal})
        .then(response => response.json())
        .then(data => 
            {
                let gifs = []
                data.data.forEach(gif => {
                    gifs = [...gifs, {small:gif["images"]["downsized_medium"]["url"],original:gif["images"]["downsized_medium"]["url"]}]
                });
                this.setState({gifs:gifs, gifsLoading:false})
            })
        .catch(function(err) {
            console.error(` Err: ${err}`);
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
        let gifsList = null
        if(this.state.gifsLoading){
            gifsList = 
            <Col s={12} style={{textAlign:"center"}}>
                <Preloader
                active
                color="blue"
                flashing={false}
                size="small"
                />
            </Col>
            
        }
        else{
            gifsList = this.state.gifs.map((gif, index) => {
                return(
                    <Col key={index} s={12}>
                        <img style={{cursor:"pointer"}} width="100%" src={gif.small} alt={"Gif"} onClick={() => this.setState({currentGif:gif.original, isGifPage:false})}></img>
                    </Col>
                )
            })
        }
        
        
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
                                    <SmallIconButton key="gif-page" onClick={() => this.setState({isGifPage:false})} icon={<ArrowBackIcon/>} />
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <h5>
                                        Choose a GIF
                                    </h5>
                                    <div style={myStyle.search}>
                                        <InputBase
                                            value={this.state.gifQuery}
                                            onChange={this.handleGifQueryChange}
                                            autoFocus
                                            placeholder="Search…"
                                            style={myStyle.inputInput}
                                        />
                                    </div>
                                </div>
                                
                                <DialogContent>
                                
                                    <Row>
                                        {gifsList}
                                    </Row>
                                </DialogContent>
                            </>
                            :
                            <>
                                <div style={{position:"absolute",right:0, top:0}}>
                                    <SmallIconButton key="text-page" onClick={this.handleClose} icon={<CloseIcon />} />
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
                                    
                                    {this.state.currentGif === ""?null:
                                    <Row>
                                        <Col s={12} style={{textAlign:"center", padding:"0"}}>
                                        <div style={{display: "inline-block",position: "relative", width:"100%"}}>
                                            <div style={{position:"absolute",right:0, top:0}}>
                                                <IconButton 
                                                    style={myStyle.removeGifButton} 
                                                    onClick={() => this.setState({currentGif:""})}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            <img style={{borderRadius:"8px"}} width="100%" src={this.state.currentGif} alt={"Gif"}></img>
                                        </div>
                                        </Col>
                                    </Row>
                                    }
                                    
                                    <Chip
                                        icon={<GifIcon />}
                                        label={"GIF"}
                                        clickable
                                        style={this.state.currentGif === ""?myStyle.normalChip:myStyle.selectChip}
                                        onClick={() => {this.setState({isGifPage:true})}}
                                    />
                                </DialogContent>
                                <DialogActions style={{padding:"8px 24px 24px 24px"}}>
                                    <Button disabled={((this.state.currentText === "") && (this.state.currentGif === "") )?true:false} style={myStyle.submitButton} onClick={this.addPost}>
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
                                        {post.text === ""?null:
                                            <Col s={12} style={myStyle.postText}>
                                                {post.text}
                                            </Col>
                                        }
                                        
                                        {post.gif === ""? null 
                                        :
                                            <Col s={12} style={myStyle.gifPost}>
                                                <img style={{width:"100%"}} src={post.gif} alt={"Gif"}></img>
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