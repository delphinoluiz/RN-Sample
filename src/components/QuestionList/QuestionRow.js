import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'


import styles from '../QuestionList/Styles'

export default class QuestionRow extends Component {
    constructor() {
        super()        
    }

    componentDidMount(){
    }


    render() {
        return (            
            <Animated.Text 
                onLayout={({nativeEvent}) => {                    
                    this.props.questionRowInfo(this.props.idx, nativeEvent.layout.y, nativeEvent.layout.height)
                }}
                style={
                    [   
                        styles.question, 
                        {opacity: this.props.opacityValue},
                    ]
                }
            >{this.props.question}</Animated.Text>
        )
    }
}