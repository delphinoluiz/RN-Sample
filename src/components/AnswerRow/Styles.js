import { StyleSheet } from 'react-native';

import { METRICS } from '../../config/metrics'
import { FONT_SIZE } from '../../config/constants'

export default StyleSheet.create({    
    textBody: {
        width: '100%',
        height: '100%',        
        justifyContent: 'center',
        // paddingHorizontal: '3%'
    },
    text: {
        fontSize: FONT_SIZE,
        color: "#fff",
        paddingHorizontal: 10 * METRICS.scaleWidth
    },
    touch: {
        width: '100%',
        flexDirection: 'row',
        height: '100%',
    }
    
});