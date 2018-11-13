import { StyleSheet } from 'react-native';

import { METRICS } from '../../config/metrics'

export default StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor:'#36a0f2'
    },
    content: {
        paddingHorizontal: 30 * METRICS.scaleWidth,
        paddingTop: 150 * METRICS.scaleHeight,
        alignItems: 'center',
        justifyContent: 'center'    
    },    
    button: {
        width:'100%',
        height: 40 * METRICS.scaleHeight,
        backgroundColor: 'rgb(81, 194, 177)',
        borderRadius: 5 * METRICS.scaleWidth,
        justifyContent:'center',
        alignItems:'center'
    }
    
});