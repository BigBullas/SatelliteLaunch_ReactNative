import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PayloadListScreen from './screens/PayloadListScreen';
import SinglePayloadScreen from './screens/SinglePayloadScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Satellite-List' component={PayloadListScreen} />
                    <Stack.Screen name='Satellite' component={SinglePayloadScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}