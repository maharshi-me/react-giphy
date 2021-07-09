import React, { Component } from 'react';
import { Navbar, Row, Col, Card, CardTitle, Icon, Button} from 'react-materialize';


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
    }
    
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts:[
                {
                    "text":"Default Post"
                },
            ]
        }
    }
    render() {
        return (
            <>
                <Navbar style={{backgroundColor:"white"}} />
                <div className="container">
                    <div className="container">
                        <Card style={myStyle.mainCard}>
                            <Row style={myStyle.noMargin}>
                                <Col s={12} style={myStyle.noPadding}>
                                    <div style={myStyle.formBox}>
                                        What's on your mind?
                                    </div>
                                </Col>
                            </Row>
                        </Card>
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