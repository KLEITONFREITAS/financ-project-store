import { createStackNavigator, createAppContainer } from 'react-navigation'
import { backgroundColor } from './utils/shared'

import Home from './pages/Home'

const Routes = createStackNavigator({
    Home
},{
    cardStyle: { backgroundColor }
})

export default createAppContainer(Routes)