import * as Location from 'expo-location';

export default async function checkLocationPermission(){
    let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                'Разрешения не предоставлены',
                'Пожалуйста, предоставьте разрешение для доступа к геолокации',
                [{ text: 'OK' }],
                { cancelable: false }
                );
                return false;
            } else{
                return true;
            }
}