import React, { Component } from 'react';
import Title from './components/Title';
import EmotionAnalysis from './components/EmotionAnalysis';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  state = {
    posts: [{
      videoLink: ''
    }]
  }

  addVideo(postSub) {
    const updatedState = { ...this.state }
    updatedState.posts[0].videoLink = postSub;
    this.setState(updatedState);
  }

  render() {
    return (
      <Container>
        <Title title={'How Do I Feel Now?'} />
        {/* <AddVideo onAddVideofunction = { (addedPost) => { //is this line calling the method in AddVideo.js line 17??
          this.addVideo(addedPost)
        }} />
        <div className = "video-wrapper">
          <Displayer posts = {this.state.posts} />
        </div> */}
        <Row className="wrapper">
          <Col className="mainpart">
            <EmotionAnalysis />
          </Col>
        </Row>
      </Container>
    )
  }

}

export default App;
