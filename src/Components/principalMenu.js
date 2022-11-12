import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Home from '../screens/Home'

const Stack = createNativeStackNavigator();

export default function PrincipalMenu () {
    return (
        <Stack.Navigator>
          <Stack.Screen name='Home' component = {Home} options={{headerShown:false}} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
  }