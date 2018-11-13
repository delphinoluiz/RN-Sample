import { StyleSheet } from 'react-native';

import { METRICS } from '../../config/metrics'

export default StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor:'#36a0f2'
    },
    questionView: {
        width: '100%',        
    },
    answerView: {
        position: 'absolute',        
        backgroundColor: '#6dc1ff', 
        left: 105 * METRICS.scaleWidth,
        right: 18 * METRICS.scaleWidth,
        borderRadius: 10,
        height: 40.6 * METRICS.scaleHeight,
        justifyContent: 'center',
    },
    selectAnswerView: {
        position: 'absolute',
        backgroundColor: '#6dc1ff',
        left: 105 * METRICS.scaleWidth,
        borderRadius: 10,
        height: 40.6 * METRICS.scaleHeight,
        justifyContent: 'center'
    }
    
});