import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, cantidad de personas, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [carnet, setCarnet] = useState();
  const [materia, setMateria] = useState('');
  const [alumnos, setAlumnos] = useState([]);
 const [modalVisible, setModalVisible] = useState(false);
  const [contador, setContador] = useState(1);

  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFecha(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };


  // Función para agregar un nuevo cliente
  const agregarAlumno = () => {
    // Genera un nuevo cliente con un ID único (incrementa el último ID generado)
    const nuevoAlumno = { id: contador, nombre: nombre, fecha: fecha, carnet: carnet, materia: materia };
    // Incrementa el contador para el próximo ID único
    setContador(contador + 1);
    // Agrega el nuevo cliente a la lista de clientes
    setAlumnos([...alumnos, nuevoAlumno]);
    // Limpia los campos de entrada
    setNombre('');
    setCarnet(null);
    setMateria('');
    setFecha(new Date());
    // Oculta el modal de agregar cliente
    setModalVisible(false);
  };

  // Función para eliminar un cliente
  const eliminarAlumno = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.clienteNombre}>
              Registra alumnos
            </Text>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="ingrese nombre del alumno"
              value={nombre}
              onChangeText={setNombre}
            />
            {/* Campo de entrada para la cantidad de personas */}
            <TextInput
              style={styles.input}
              placeholder="Aguegue carnet"
              value={carnet}
              onChangeText={setCarnet}
            />
            {/* Campo de entrada para la materia favorita */}
            <TextInput
              style={styles.input}
              placeholder="Materia favorita del alumno"
              value={materia}
              onChangeText={setMateria}
            />
            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity style={styles.input} onPress={showDatepicker}>
              <Text>Establece su fecha de nacimiento</Text>
            {/* Muestra la fecha seleccionada */}
            <Text 
            >selected: {fecha.toLocaleString()}</Text>
            </TouchableOpacity>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el cliente */}
            <Button title="Agregar alumno" onPress={agregarAlumno} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={alumnos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.clienteItem}
          >

            {/* Muestra el ID, nombre y fecha de reserva del cliente */}
            <TouchableOpacity
              onPress={() => eliminarAlumno(item.id)}>
              <Text>🗑️</Text>
            </TouchableOpacity>
            <Text style={styles.clienteNombre}>{item.id}</Text>
            <Text style={styles.clienteNombre}>Cliente: {item.nombre}</Text>
            <Text style={styles.clienteFecha}>
              Fecha de nacimiento: {item.fecha.toDateString()}
            </Text>
            <Text style={styles.clienteFecha}>Carnet: {item.carnet}</Text>
            <Text style={styles.clienteFecha}>Materia favorita: {item.materia}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada cliente como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 35,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 60,
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
  botonEliminar: {
    marginLeft: 200,
    fontSize: 18,
  },
});

export default App;
