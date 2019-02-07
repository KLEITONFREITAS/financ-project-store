import { createStackNavigator, createAppContainer } from 'react-navigation'
import { backgroundColor } from './utils/shared'

import Home from './pages/Home'
import Register from './pages/Register'

const Routes = createStackNavigator({
    Home,
    Register
},{
    cardStyle: { backgroundColor }
})

export default createAppContainer(Routes)