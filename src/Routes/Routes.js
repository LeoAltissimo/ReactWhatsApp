import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';

//Views Import
import {
  ConnectedFormLogin,
  ConnectedFormSignup,
  ConnectedConversationList,
  ConnectedContactsList,
  ConnectedConversation
} from '../views';

// Main tab navigation
export const TabMain = createMaterialTopTabNavigator(
  {
    TabConversas: {
      screen: ConnectedConversationList,
      navigationOptions: () => ({
        title: `Conversas`,
      })
    },
    TabContatos: {
      screen: ConnectedContactsList,
      navigationOptions: () => ({
        title: `Contatos`,
      })
    }
  },
  {
    tabBarOptions: {
      scrollEnabled: false,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#3F51B5',
        color: '#FBC02D',
        justifyContent: 'center',
        paddingTop: 30
      },
      indicatorStyle: {
        backgroundColor: '#FBC02D',
        height: 4,
        color: '#FBC02D',
      },
    },
    initialRouteName: 'TabConversas'
  }
);

// Initial Route Stack
const rotas = createStackNavigator(
  {
    FormLogin: ConnectedFormLogin,
    FormSignup: ConnectedFormSignup,
    TabMain: TabMain,
    Conversation: ConnectedConversation
  },
  {
    initialRouteName: 'FormLogin',
    headerMode: "none"
  }
);

export const StackNavigation = createAppContainer(rotas);