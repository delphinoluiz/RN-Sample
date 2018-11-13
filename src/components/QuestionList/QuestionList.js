import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'


import QuestionRow from './QuestionRow'
import styles from '../QuestionList/Styles'
import { METRICS } from '../../config/metrics';

export default class QuestionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

    componentDidMount(){
        

    }

    

    
    
    _questionRowInfo(idx, y, height) {   
        if(idx == this.props.questionIdx){
            this.props._newLineQuestionHeigth(y, height)
        }
    }    

    render() {  
        return (
            this.props.questions.map((question, i) => {
                return <QuestionRow 
                            key={i} 
                            question={question} 
                            idx={i}
                            opacityValue={this.props.opacityValues[i]}
                            questionRowInfo={(idx, y, height) => {
                                this._questionRowInfo(idx, y, height)
                            }}
                        />
            })
                      
        )
    }
}