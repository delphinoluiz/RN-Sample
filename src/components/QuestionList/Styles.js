import { StyleSheet } from 'react-native';

import { METRICS } from '../../config/metrics'
import { FONT_SIZE } from '../../config/constants'

export default StyleSheet.create({    
    questionBody: {
        width: '100%',
        position: 'absolute',
        bottom: METRICS.screenHeight / 2,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#000000'
    },
    question: {     
        fontSize: FONT_SIZE,
        color: '#ffffff',
        paddingHorizontal: 20 * METRICS.scaleWidth,
        paddingBottom: 5 * METRICS.scaleHeight
    },
    
});