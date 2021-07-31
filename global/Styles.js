import { StyleSheet } from 'react-native';

export default globalStyles = StyleSheet.create({
    button: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: 'rgb(97,218,251)',
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
    title: {
        fontSize: 23
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
    }
})