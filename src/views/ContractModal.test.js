// ContractModal.test.js
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ContractModal from './ContractModal';

test('maneja correctamente la respuesta del servidor al subir un archivo', async () => {
  const mock = new MockAdapter(axios);
  const handleClose = jest.fn();
  const { getByLabelText, getByText } = render(<ContractModal show={true} handleClose={handleClose} />);

  // Tu componente ContractModal tiene un input de tipo file con la etiqueta "Subir Contrato"
  const fileInput = getByLabelText('Subir Contrato');
  const submitButton = getByText('Subir');

  // Crea un archivo de prueba
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });

  // Simula la selección de un archivo
  fireEvent.change(fileInput, { target: { files: [file] } });

  // Configura una respuesta simulada para axios.post
  mock.onPost(ENDPOINT.upload).reply(200, { message: 'Archivo subido con éxito' });

  // Simula el clic en el botón de subir
  fireEvent.click(submitButton);

  // Espera a que se muestre el mensaje de éxito
  // Aquí necesitas ajustar el selector a tu código real. 
  // Por ejemplo, si muestras el mensaje de éxito en un alert, podrías buscar el texto del alert.
  await waitFor(() => getByText('Archivo subido con éxito'));
});