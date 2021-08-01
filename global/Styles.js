import { StyleSheet } from 'react-native';

export default globalStyles = StyleSheet.create({
    button: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#6566fd',
        elevation: 2, // Android
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    h2: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    h3: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
    h4: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },
    h5: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff'
    },
    h6: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff'
    },
    h7: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        padding: 8,
        margin: 8
    },
    link: {
        color: 'rgb(33,201,250)',
        fontWeight: 'bold',
        fontSize: 15
    },
    label: {
        fontSize: 14
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#0E0938',
    }
})