import { StyleSheet } from 'react-native';

import { METRICS } from '../../config/metrics'

export default StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor:'#36a0f2'
    },
    content: {
        paddingHorizontal: 30 * METRICS.scaleWidth,
        paddingTop: 80 * METRICS.scaleHeight
    },
    titleView: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18 * METRICS.scaleHeight,
        color: '#fff'
    },
    listView: {
        width:'100%',
        height: '80%',
        backgroundColor: '#fff'
    },    
    item: {
        width: '94%',
        marginHorizontal: '3%',
        flexDirection: 'row',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1
    },
    cover: {
        width: '20%',
        paddingVertical: 10 * METRICS.scaleHeight
    },
    coverSize: {
        width: 40 * METRICS.scaleHeight,
        height: 40 * METRICS.scaleHeight,
        borderRadius: 20 * METRICS.scaleHeight
    },
    pageNameView: {
        width: '60%',
        justifyContent:'center',
        // alignItems: 'center'
    },
    pageName: {
        fontSize: 18 * METRICS.scaleHeight,
        color: '#000'
    },
    leftIcon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
    
});