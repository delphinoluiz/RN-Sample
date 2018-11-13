import React, {Component} from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Animated 
} from 'react-native'
import { connect } from 'react-redux'
import { isIphoneX } from 'react-native-iphone-x-helper'
import FBSDK from 'react-native-fbsdk'
import { NavigationActions, StackActions } from "react-navigation"
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { METRICS } from '../../config/metrics'


const {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} = FBSDK

import {
    QUESTION_START_POS,
    ANSWER_BODY_HEIGHT,
    ANSWER_MARGIN_BOTTOM,
    ANSWERS_START_POS,
    SELECT_ANSWER_START_POS_X
} from '../../config/constants'

import styles from './Styles';
import { QuestionList, AnswerRow } from '../../components'

var data = require('../../assets/json/customData.json')

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionKey: "welcome",
            questionIdx: 0,
            answersVisible: false,
            selectAnswer: undefined,
            selectAnswerIdx: -1,

            questions: [],
            currentQuestionPos: QUESTION_START_POS,   
            questionBodyHeight: 0,                     
            
            answers: [],
            visible: false,

            date: '',
            isDateTimePickerVisible: false
        }        
        this._initializeAnimationValues()
        this._responsePagesInfoCallback = this._responsePagesInfoCallback.bind(this)
    }

    componentDidMount(){        
        if(this.props.navigation.state.params){
            let data = this.props.navigation.state.params.questionData
            let questions = data.questions;
            for(var i = 0 ; i < questions.length ; i++){
                this.questionOpacityValues[i] = new Animated.Value(0)
            }

            let answers = data.answers;    
            for(var i = 0 ; i < answers.length ; i++) {
                this.answerOpacityValues[i] = new Animated.Value(0)
                this.answerTranslateYValue[i] = new Animated.Value(ANSWERS_START_POS)
            }

            this.setState({
                questions,
                answers
            }) 
        }else{
            this._getData()
        }
        
    }

    /********************************** Initialize animation variables ************************/
    _initializeAnimationValues() {
        this.questionOpacityValues = []
        this.questionTranslateYValue = new Animated.Value(this.state.currentQuestionPos)

        this.answerOpacityValues = []
        this.answerTranslateYValue = []
    }

    /********************************** Get Questions and Answers ************************/
    _getData() { 
        let questions = data[this.state.questionKey].questions;
        for(var i = 0 ; i < questions.length ; i++){
            this.questionOpacityValues[i] = new Animated.Value(0)
        }

        let answers = data[this.state.questionKey].answers;    
        for(var i = 0 ; i < answers.length ; i++) {
            this.answerOpacityValues[i] = new Animated.Value(0)
            this.answerTranslateYValue[i] = new Animated.Value(ANSWERS_START_POS)
        }

        this.setState({
            questions,
            answers
        }) 
    }

    /********************************** Check next question ************************/
    _checkNextQuestion(key){
        if(data[key]){
            return true
        }else
            return false
    }

    /*************************************** Reset all the data after select an answer **************************/
    _resetAllData() {      
        
        this.setState({
            questions: [],
            answers: [],
            answersVisible: false,
            questionIdx: 0,
            selectAnswerIdx: -1,
            currentQuestionPos: QUESTION_START_POS,
            questionBodyHeight: 0,
            questionKey: this.state.selectAnswer.answer.key
        }, () => {
            this._initializeAnimationValues()
            this._getData()
        })
    }

    /*************************************** Initialize answers **************************/
    _selectAnswer(layout, answer, i) {
        if(this._checkNextQuestion(answer.key)){
            this.selectAnswerTranslateYValue = new Animated.Value(ANSWERS_START_POS - (this.state.answers.length - i - 1) * (ANSWER_BODY_HEIGHT + ANSWER_MARGIN_BOTTOM))
            this.selectAnswerTranslateXValue = new Animated.Value(SELECT_ANSWER_START_POS_X)
            this.selectAnswerOpacityValue = new Animated.Value(1)
            let selectAnswer = {
                idx: i,
                answer: answer,
                layout
            }
            let selectAnswerIdx = i
            this.setState({
                selectAnswer,
                selectAnswerIdx
            })
        }else{
            if(answer.key == 'datepicker'){
                this.setState({isDateTimePickerVisible: true})
            }else if(answer.key == 'facebook_login'){
                this._facebookLogin()
            }else if(answer.key == 'customer_yes'){

            }else if(answer.key == 'customer_no'){
                this.setState({visible: true}, () => {
                    this._getCurrentUserId()
                })
                
            }
            
        }        
    }

    /*************************************** Get current user's facebook id **************************/
    _getCurrentUserId() {
        AccessToken.getCurrentAccessToken().then((data) => {
            if(data) {
                const infoRequest = new GraphRequest(
                    '/me?fields=id',
                    null,
                    (err, result) => {
                        this._getUserInfo(result.id)
                    }
                )
                new GraphRequestManager().addRequest(infoRequest).start()
            }else{
                
            }
        })
    }

    /*************************************** Get current user's facebook info **************************/
    _getUserInfo(id) {
        const infoRequest = new GraphRequest(
            '/' + id + '?fields=first_name,last_name,email,name,location,picture.type(large),photos',
            null,
            (err, res) => {            
                // console.log(res)   
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'EditInfo',
                            params: {userInfo: res}
                        })
                    ]
                });
                this.setState({visible: false}, () => {
                    setTimeout(() => {
                        this.props.navigation.dispatch(resetAction); 
                    }, 500)
                })    
            }
        )
        new GraphRequestManager().addRequest(infoRequest).start()
    }

    /*************************************** Facebook login **************************/
    _facebookLogin(){
        LoginManager.setLoginBehavior('web')
        LoginManager.logInWithReadPermissions(["public_profile", "pages_show_list", "user_location"]).then((result) => {
            if(result.isCancelled){
                console.log('login cancelled')
            }else{
                AccessToken.getCurrentAccessToken().then((data) => {
                    if(data){
                        const infoRequest = new GraphRequest(
                            '/me/accounts?fields=id,name,access_token,cover',
                            null,
                            this._responsePagesInfoCallback
                        )                
                        this.setState({visible: true}, () => {
                            new GraphRequestManager().addRequest(infoRequest).start()
                        })                        
                    }else{
                    }
                })
                .catch((err) =>{
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    /*************************************** Response data after facebook login **************************/
    _responsePagesInfoCallback(err, result){
        if(err){
            console.log(err)
        }else{
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Pages',
                        params: {pageInfo: result}
                    })
                ]
            });
            this.setState({visible: false}, () => {
                setTimeout(() => {
                    this.props.navigation.dispatch(resetAction); 
                }, 500)
            })            
        }
    }

    /********************************** Get the height of the new question element ******************************/
    _newLineQuestionHeigth(y, height) {
        this._questionAnimate(height)
    }

    /********************************** Question animations ******************************/
    _questionAnimate(height) {
        Animated.sequence(
            [
                Animated.timing(
                    this.questionTranslateYValue,
                    {
                        toValue: this.state.currentQuestionPos - height,
                        duration: 300
                    }
                ),
                Animated.timing(
                    this.questionOpacityValues[this.state.questionIdx],
                    {
                        toValue: 1,
                        duration: 1000
                    }
                )

            ]
        ).start()     

        if(this.state.questionIdx < this.state.questions.length - 1){ 
            setTimeout(() => {
                let questionIdx = this.state.questionIdx + 1   
                this.setState({
                    questionIdx, 
                    questions: [],
                    currentQuestionPos: this.state.currentQuestionPos - height
                }, () => {
                    this.setState({questions: data[this.state.questionKey].questions})
                })
            }, 2000)
        }else{
            setTimeout(() => {
                this.setState({
                    answersVisible: true
                })
            }, 2000)
            
        }
        
    }

    /********************************** Answers show animations ******************************/
    _answersShowAnimate(layout, i) { 
        Animated.parallel([
            Animated.timing(
                this.answerTranslateYValue[i],
                {  
                    toValue: ANSWERS_START_POS - (this.state.answers.length - i - 1) * (ANSWER_BODY_HEIGHT + ANSWER_MARGIN_BOTTOM), 
                    duration: 300
                }
            ),  
            Animated.timing(
                this.answerOpacityValues[i],
                {
                    toValue: 1,
                    duration: 700
                }
            )
        ]).start() ,
        setTimeout(() => {
            this.setState({
                selectAnswer: undefined
            }, () => {
                this.selectAnswerOpacityValue = new Animated.Value(1)
            })
        }, 700)
    }

    /********************************** Answers hidden animations ******************************/
    _answersHiddenAnimate(){
        const animations =  this.state.answers.map((item, i) => {
            return Animated.timing(
                this.answerOpacityValues[i],
                {
                    toValue: 0,
                    duration: 300
                }
            )                
        })
        return animations
    }

    /********************************** Select answer animations ***********************/
    _startTotalAnimate(layout) {     
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.selectAnswerTranslateXValue,
                    {
                        toValue: this.state.selectAnswer.layout.width - layout.width,
                        duration: 700
                    }
                ),
                Animated.timing(
                    this.selectAnswerTranslateYValue,
                    {
                        toValue: METRICS.screenHeight / 2 + 10,
                        duration: 700
                    }
                )
            ].concat(this._answersHiddenAnimate())),
            Animated.parallel([
                Animated.timing(
                    this.questionTranslateYValue,
                    {
                        toValue: - this.state.questionBodyHeight,
                        duration: 700
                    }
                ),
                Animated.timing(
                    this.selectAnswerTranslateYValue,
                    {
                        toValue: isIphoneX() ? 35 : 15,
                        duration: 700
                    }
                ),
                Animated.timing(
                    this.selectAnswerOpacityValue,
                    {
                        toValue: 0.3,
                        duration: 700
                    }
                )
            ])
        ]).start()  
        setTimeout(() => {
            this._resetAllData()
        }, 1400)
        
    }

    /********************************** Get Date String ***********************/
    _calcDateString(date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let dateStr = year.toString() + '-' + (month + 1 < 10 ? '0' + (month + 1) : month.toString()) + '-' + (day < 10 ? '0' + day : day.toString());
        return dateStr
    }
    
    /********************************** Select a date from datePicker ***********************/
    _handleDatePicked(date) {
        let dateStr = this._calcDateString(date)
        this._initializeAnimationValues()
        let questionData = {
            label: "",
            questions:[
                "Please login with facebook."
            ],
            answers: [
                {
                    key: "facebook_login",
                    value: "Facebook Login"
                }
            ]
        }
        let questions = questionData.questions;
        for(var i = 0 ; i < questions.length ; i++){
            this.questionOpacityValues[i] = new Animated.Value(0)
        }

        let answers = questionData.answers;    
        for(var i = 0 ; i < answers.length ; i++) {
            this.answerOpacityValues[i] = new Animated.Value(0)
            this.answerTranslateYValue[i] = new Animated.Value(ANSWERS_START_POS)
        }

        this.setState({
            questionKey: "welcome",
            answersVisible: false,
            selectAnswer: undefined,
            selectAnswerIdx: -1,
            currentQuestionPos: QUESTION_START_POS,   
            questionBodyHeight: 0,     
            visible: false,

            questions,
            answers,
            date: dateStr,
            isDateTimePickerVisible: false
        }) 
    }
    /********************************** Cancel datePicker ***********************/
    _hideDateTimePicker() {
        this.setState({ isDateTimePickerVisible: false });
    }

    /********************************** Questions view ******************************/
    renderQuestionsView() {
        return (
            <Animated.View 
                style={[styles.questionView, {transform: [{translateY: this.questionTranslateYValue}]}]}
                onLayout={({nativeEvent}) => {
                    this.setState({questionBodyHeight: nativeEvent.layout.height})
                }}
                > 
            {
                this.state.questions.length > 0 && 
                <QuestionList 
                    questions={this.state.questions}
                    questionIdx={this.state.questionIdx}
                    opacityValues={this.questionOpacityValues}
                    _newLineQuestionHeigth={(y, height) => {
                        this._newLineQuestionHeigth(y, height)
                    }}
                />
            }               
            </Animated.View>  
        )
    }

    /********************************** Answers view ******************************/
    renderAnswersView() {
        return (
            this.state.answers.map((answer, i) => {
                return  (
                    this.state.selectAnswer && i == this.state.selectAnswerIdx ? null
                    :   <Animated.View 
                            key={i}
                            style={[
                                styles.answerView, 
                                {opacity: this.answerOpacityValues[i]},
                                {transform: [
                                    {translateY: this.answerTranslateYValue[i]}
                                ]}
                            ]}
                            onLayout={({nativeEvent}) => {
                                this._answersShowAnimate(nativeEvent.layout, i)
                            }}
                            >
                            <AnswerRow
                                selectable
                                disabled={this.state.selectAnswer ? true : false}
                                answer={answer}
                                onPressRow={(layout) => {
                                    this._selectAnswer(layout, answer, i)
                                }}
                            />
                        </Animated.View>
                )                
            })
        )
    }

    /********************************** Select Answer view ******************************/
    renderSelectAnswerView() {
        return (
            <Animated.View 
                style={[
                    styles.selectAnswerView,
                    {opacity: this.selectAnswerOpacityValue},
                    {transform: [
                        {translateX: this.selectAnswerTranslateXValue},
                        {translateY: this.selectAnswerTranslateYValue}
                    ]}
                ]}
            >
                <AnswerRow 
                    answer={this.state.selectAnswer.answer}
                    _startTotalAnimate={(layout) => {
                        this._startTotalAnimate(layout)
                    }}
                />
            </Animated.View>
        )
    }

    render() {
        return (
            <View style={styles.container}>    
                { this.renderQuestionsView() }                 
                { this.state.answersVisible && this.renderAnswersView() }
                { this.state.selectAnswer && this.renderSelectAnswerView() }
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <DateTimePicker
                    titleIOS={'Do you want to schedule this video to be posted on Facebook?'}
                    isVisible={this.state.isDateTimePickerVisible}
                    date={!this.state.date ? new Date() : new Date(this.state.date)}
                    onConfirm={date => {
                        this._handleDatePicked(date);
                    }}
                    onCancel={date => {
                        this._hideDateTimePicker();
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Home)