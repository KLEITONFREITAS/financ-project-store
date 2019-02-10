import { createStackNavigator, createAppContainer } from 'react-navigation'
import { backgroundColor } from './utils/shared'

import Main from './pages/Main'

const Routes = createStackNavigator({
  Main,
},{
  cardStyle: { backgroundColor }
})

export default createAppContainer(Routes)