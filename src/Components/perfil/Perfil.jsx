import React, { useState } from 'react';
import { Box, Button, Container, Modal, TextField, Typography } from '@mui/material';
import Navbar from '../navbar/Navbar';
import { useAuth } from "../context/authContext";
import './perfil.css';
import Post from '../Post/Post';

function Profile({ profile }) {
  const [editing, setEditing] = useState(false);
  const [tempCity, setTempCity] = useState('Merida'); 
  const [tempOrigin, setTempOrigin] = useState('Merida');
  const [tempStatus, setTempStatus] = useState('Soltero'); 
  const [city, setCity] = useState('Merida'); 
  const [origin, setOrigin] = useState('Merida'); 
  const [status, setStatus] = useState('Soltero');
  const auth = useAuth();
  const { displayName } = auth.user;
  
  const handleSave = () => {
    
    setCity(tempCity);
    setOrigin(tempOrigin);
    setStatus(tempStatus);
    setEditing(false); 
  };

  const handleCancel = () => {
   
    setEditing(false); 
  };

  return (
    <>
      <Navbar />
      <Container className='ContainerProf'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:"80px" }}>
        <Box sx={{ width: '100%', maxWidth: 1300 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography color={"#060505"} variant="h4">
              {displayName && <h5>Bienvenido de vuelta : {displayName}</h5>}
              </Typography>
              <Typography color={"#050404"} variant="body1">
                Hola amigos, ¿cómo están?
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography  color={"#040404"} variant="h2">
              Mis publicaciones
            </Typography>
          </Box>
          <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                {profile ? (
                  <Box>
                    <Typography variant="h4">Información de usuario</Typography>
                    <Box>
                      <Typography variant="body1"><strong>Ciudad:</strong> {city}</Typography>
                      <Typography variant="body1"><strong>Originario de:</strong> {origin}</Typography>
                      <Typography variant="body1"><strong>Estado:</strong> {status}</Typography>
                    </Box>
                    <Button onClick={() => setEditing(true)} variant="contained">Editar</Button>
                    <Modal
                      open={editing}
                      onClose={() => setEditing(false)}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 4, maxWidth: 500 }}>
                        <Typography id="modal-title" variant="h6" component="h2">
                          Editar información
                        </Typography>
                        <TextField
                          label="Ciudad"
                          value={tempCity}
                          onChange={(e) => setTempCity(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Originario de"
                          value={tempOrigin}
                          onChange={(e) => setTempOrigin(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Estado"
                          value={tempStatus}
                          onChange={(e) => setTempStatus(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Button onClick={handleSave} variant="contained" color="primary">Guardar</Button>
                          <Button onClick={handleCancel} variant="contained" color="secondary">Cancelar</Button>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                ) : (
                  <Post />
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      </Container>
    </>
  );
}

export default Profile;
