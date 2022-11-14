import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Home from '../screens/Home'
import Search from '../screens/Search'

const Stack = createNativeStackNavigator();

export default function PrincipalMenu () {
    return (
        <Stack.Navigator>
          <Stack.Screen name='Home' component = {Home} options={{headerShown:false}} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    );
  }