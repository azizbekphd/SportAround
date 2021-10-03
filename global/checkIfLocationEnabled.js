import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default async function checkIfLocationEnabled(){
    let enabled = await Location.hasServicesEnabledAsync()
    if(enabled){
        enabled = await Location.enableNetworkProviderAsync()
        return true;
    }else{
        Alert.alert("Геолокация", "Пожалуйста, включите геолокацию для доступа к Вашему местоположению");
        return false;
    }
}