import React, { useState } from "react";
import { 
  Box, 
  Button, 
  InputBase, 
  Typography, 
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import Modal from "./Modal"; 
import "./compartir.css"; 

export default function Share() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sharedText, setSharedText] = useState("");
  const [sharedImage, setSharedImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setShowModal(true);
  };

  const handleSave = (text) => {
    setSharedText(text);
    setSharedImage(file);
    setFile(null);
    setShowModal(false);
  };

  const handleShare = () => {
    if (sharedImage) {
      console.log("Foto compartida:", sharedImage);
      console.log("Texto compartido:", sharedText);
    } else {
      console.log("No se ha seleccionado ninguna foto.");
    }
  };

  return (
    <Box className="boxShare">
      <CardContent sx={{ p: 2, bgcolor: "white" }}>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Comienza a compartir algo en el blog
        </Typography>
        <InputBase
          placeholder="Escribe lo que estes pensando..."
          fullWidth
          value={sharedText}
          onChange={(e) => setSharedText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <hr className="shareHr" />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label htmlFor="file">
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<LocalSeeIcon />}
            >
              comparte una foto
            </Button>
          </label>
          <Button variant="contained" color="primary" onClick={handleShare}>
            Compártelo
          </Button>
        </Box>
        {sharedImage && (
          <Card sx={{ mt: 2 }}>
            <CardMedia
              component="img"
              image={URL.createObjectURL(sharedImage)}
              alt="Shared"
              sx={{ maxHeight: 300, borderRadius: 1 }}
            />
          </Card>
        )}
      </CardContent>
      {showModal && (
        <Modal
          file={file}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}
