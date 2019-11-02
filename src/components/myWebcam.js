import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { Button, Container, Col, Row } from 'reactstrap';

class MyWebcam extends Component {
    constructor(props) {
        super(props)
        this.timerId = null;
        this.isCapturing = false;
    };

    setRef = webcam => {
        this.webcam = webcam;
    };

    convertToByteArray = (img) => {
        const base64 = require('base64-js');
        const base64string = img.split(',')[1];
        return base64.toByteArray(base64string);
    };

    fetchData = (byteArray) => {
        const apikey = '8ae148562d274a1091a8a2ac9402f423';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion';
        fetch(apiEndpoint, {
            body: byteArray,
            headers: { 'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apikey, 'Content-Type': 'application/octet-stream' },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    var happiness = (data[0] != null ? data[0].faceAttributes.emotion.happiness : 0);
                    var emotionArr = {
                        'rec_happiness': (data[0] != null ? data[0].faceAttributes.emotion.happiness : 0),
                        'rec_anger': data[0] != null ? data[0].faceAttributes.emotion.anger : 0,
                        'rec_contempt': data[0] != null ? data[0].faceAttributes.emotion.contempt : 0,
                        'rec_disgust': data[0] != null ? data[0].faceAttributes.emotion.disgust : 0,
                        'rec_fear': data[0] != null ? data[0].faceAttributes.emotion.fear : 0,
                        'rec_neutral': data[0] != null ? data[0].faceAttributes.emotion.neutral : 0,
                        'rec_sadness': data[0] != null ? data[0].faceAttributes.emotion.sadness : 0,
                        'rec_surprise': data[0] != null ? data[0].faceAttributes.emotion.surprise : 0,
                    };
                    // happiness = (Math.round(happiness * 100))
                    if (this.isCap) {
                        console.log('new line:')
                        console.log(emotionArr);
                        Object.keys(emotionArr).map((arr) => {
                            this.returnResult(arr, emotionArr[arr], true)
                        });
                    } else {
                        clearInterval(this.timerId);
                        Object.keys(emotionArr).map((arrkey) => {
                            this.returnResult(arrkey, emotionArr[arrkey], false)
                        });
                    }
                })
            }
        });
    };

    returnResult = (key, data, boo) => {
        var props = this.props;
        if (boo == true) {
            var emotionData = (Math.round(data * 100));
            props[key](emotionData);
        } else {

        }
    };

    startCapture = () => {
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            const img = this.webcam.getScreenshot();
            const byteArrImg = this.convertToByteArray(img);
            this.fetchData(byteArrImg);
        }, 200)
    };

    stopCap = () => {
        this.isCap = false;
        clearInterval(this.timerId);
    };

    render() {
        const videoConstraints = {
            width: '750px',
            height: '500px',
            facingMode: 'user'
        }
        return (
            <Col>
                <Row>
                    <Webcam
                        ref={this.setRef}
                        audio={false}
                        height={250}
                        width={375}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </Row>
                <Button color="success" onClick={this.startCap}>Start</Button>
                <Button color="warning" onClick={this.stopCap}>Stop</Button>
            </Col>
        )
    };

};

export default MyWebcam;