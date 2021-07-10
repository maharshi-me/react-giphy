import React, { Component } from 'react';
import { Navbar, Row, Col, Card, CardTitle, Icon, Button, Textarea} from 'react-materialize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    }
    
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            currentText:"",
            posts:[
                {
                    "text":"This is default post"
                },
            ]
        }
    }
    handleClose = () => {
        this.setState({open:false})
    }
    addPost = () => {
        this.setState({posts:[{text:this.state.currentText}, ...this.state.posts], currentText:"", open:false})
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
                                    <div style={myStyle.formBox} onClick={() => this.setState({open:true})}>
                                        What's on your mind?
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
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
                            </DialogContent>
                            <DialogActions>
                                <Button disabled={(this.state.currentText == "")?true:false} style={myStyle.submitButton} onClick={this.addPost}>
                                    Post
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {this.state.posts.map((post, index) => {
                            return(
                                <Card key={index} style={myStyle.mainCard}>
                                    <Row style={myStyle.noMargin}>
                                        <Col s={12} style={myStyle.noPadding}>
                                            {post.text}
                                        </Col>
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