import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CardMedia
} from "@mui/material";

export default function Modal({ file, onClose, onSave }) {
  const [text, setText] = useState("");

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CardMedia
            component="img"
            image={URL.createObjectURL(file)}
            alt="Preview"
            sx={{ maxHeight: 300, borderRadius: 1, mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Añadir un texto..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
