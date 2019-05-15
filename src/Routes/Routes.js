import { 
  createStackNavigator, 
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation';

//Views Import
import { 
    ConnectedFormLogin, 
    ConnectedFormSignup,
    Conversas,
    Contatos,
    AddContato
} from '../views';

// Main tab navigation
export const TabMain = createMaterialTopTabNavigator(
  {
      TabConversas: {
        screen: Conversas,
        navigationOptions: () => ({
            title: `Conversas`,
          })
      },
      TabContatos: {
          screen: Contatos,
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
    AddContato: AddContato
  },
  {
    initialRouteName: 'FormLogin',
    headerMode: "none"
  }
);
  
export const StackNavigation = createAppContainer(rotas);