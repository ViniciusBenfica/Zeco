import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import Body from '../components/Body';
import Container from '../components/Container';
import Input from '../components/Input';
import SimpleButton from '../components/SimpleButton';
import { useContext, useState } from 'react';
import { UserContext } from "../providers/UserContext"
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/Api';

export default function Login() {
  const { setUser } = useContext(UserContext)
  const navigation = useNavigation();

  const [dataUser, setDataUser] = useState({
    cpf: '',
    password: '',
  })

  const login = async () => {
    const {data, status} = await api.post('/user/login', dataUser)
    if(status == 201){
      data.produtor ? setUser({id:data.id, name: data.name, produtorId: data.produtor.id}) : setUser({id:data.id, name: data.name})
      navigation.navigate('Code')
    }
  }

  return (
    <Container>
      <Text style={{fontSize: 38, color: "#60D482"}}>Zeco</Text>
      <Text style={{fontSize: 17, color: "#808080"}}>Digite suas informações</Text>
      <Body>
        <Input setData={setDataUser} type='text' name="cpf" placeholder="Seu cpf" title="CPf"/>
        <Input setData={setDataUser} secureTextEntry={true} type='password' name="password" placeholder="*****" title="Senha"/>
        <Text style={{fontSize: 17, color: "#60D482"}}>Esqueci minha senha</Text>
      </Body>
      <Body>
        <SimpleButton todo={login} content="Confirmar"/>
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({

});