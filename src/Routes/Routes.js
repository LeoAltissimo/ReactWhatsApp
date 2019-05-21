import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';

//Views Import
import {
  ConnectedFormLogin,
  ConnectedFormSignup,
  ConversationList,
  ConnectedContactsList,
  Conversation
} from '../views';

// Main tab navigation
export const TabMain = createMaterialTopTabNavigator(
  {
    TabConversas: {
      screen: ConversationList,
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
        backgroundColor: '#287f62',
        justifyContent: 'center',
        paddingTop: 30
      },
      indicatorStyle: {
        backgroundColor: '#fff'
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
    AddContato: ConversationList,
    Conversation: Conversation
  },
  {
    initialRouteName: 'Conversation',
    headerMode: "none"
  }
);

export const StackNavigation = createAppContainer(rotas);