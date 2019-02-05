import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './pages/Home'

const Routes = createStackNavigator({
    Home
},{
    cardStyle: {  backgroundColor: '#313C38' }
})

export default createAppContainer(Routes)