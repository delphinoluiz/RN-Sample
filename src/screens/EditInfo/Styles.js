import { StyleSheet } from 'react-native';

import { METRICS } from '../../config/metrics'

export default StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor:'#36a0f2'
    },
    content: {
        marginHorizontal: 30 * METRICS.scaleWidth,
        marginTop: 80 * METRICS.scaleHeight,
        marginBottom: 50 * METRICS.scaleHeight
    },
    textInput: {
        width: '100%'
    },
    label: {
        paddingLeft: 10 * METRICS.scaleWidth,
        fontSize: 15 * METRICS.scaleHeight,
        color: '#fff'
    },
    input :{
        height: 40 * METRICS.scaleHeight,
        backgroundColor: '#fff',
        color: 'black',
        borderRadius: 6,
        paddingHorizontal: 5
    },
    button: {
        width:'100%',
        height: 50 * METRICS.scaleHeight,
        backgroundColor: 'rgb(81, 194, 177)',
        borderRadius: 5 * METRICS.scaleWidth,
        justifyContent:'center',
        alignItems:'center'
      }
    
});