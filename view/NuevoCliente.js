import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput, Headline, Button, Paragraph,Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const{guardarConsultarAPI}= route.params;

    //Campos Formulario
    const [nombre, guardarNombre]= useState('');
    const [telefono, guardarTelefono]= useState('');
    const [correo, guardarCorreo]= useState('');
    const [empresa, guardarEmpresa]= useState('');
    const [alerta, guardarAlerta]= useState(false);
    
    //Detectar si estamos editando o no
    useEffect(() => {
        if (route.params.cliente) {
            const {nombre, telefono, correo, empresa} = route.params.cliente;
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);
            
        }
        
        
    }, []);

    //Guardaer Cliente en la BD
    const guardarCliente = async ()=>{
        //Validar
        if(nombre=== '' || telefono === '' || correo === '' || empresa === ''){
        guardarAlerta(true);
        console.log('guardando');
        return;
        }

        //generar el cliente
        const cliente = {nombre,telefono,correo,empresa};
        console.log(cliente);
        //Si estamos editando o creando un nuevo cliente
        if (route.params.cliente) {
            const{id}= route.params.cliente;
            cliente.id=id;
            const url= `http://192.168.0.6:3000/clientes/${id}`;
            try {
                await axios.put(url, cliente);
            } catch (error) {
                console.log(error);
                
            }
            
        }
        else{
            
        //guardar el cliente en la api
        try {
            await axios.post('http://192.168.0.6:3000/clientes', cliente);
        } catch (error) {
            console.log(error);
            
        }

        }


        //Redireccionar
        navigation.navigate('Inicio');

        //limpiar el form (opcional)
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');
        //Cambiar a true para traer el nuevo cliente
        guardarConsultarAPI(true);

    }






    const leerNombre = ()=>{
        console.log('escribiendo');
    }
    return (  
        <View style={globalStyles.contenedor}>

            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

            <TextInput
                label="Nombre"
                placeholder="Juan"
                onChangeText={ texto => guardarNombre(texto) }
                value={nombre}
                style={styles.input}
            />
            <TextInput
                label="Teléfono"
                placeholder="13131414"
                onChangeText={ texto => guardarTelefono(texto) }
                value={telefono}
                style={styles.input}
            />
            <TextInput
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={ texto => guardarCorreo(texto) }
                value={correo}
                style={styles.input}
            />
            <TextInput
                label="Empresa"
                placeholder="Nombre Empresa"
                onChangeText={ texto => guardarEmpresa(texto) }
                value={empresa}
                style={styles.input}
            />

            <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente() }>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={ () => guardarAlerta(false) }
                 >
                   <Dialog.Title>Error</Dialog.Title>
                   <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                   </Dialog.Content>
                   <Dialog.Actions>
                       <Button onPress={ () => guardarAlerta(false) }>OK</Button>
                   </Dialog.Actions>
                </Dialog>
            </Portal>
             
        </View>

    );
}
const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
 
export default NuevoCliente;