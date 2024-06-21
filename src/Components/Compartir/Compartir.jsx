import React, { useState } from "react";
import { 
  Box, 
  Button, 
  InputBase, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton,
} from "@mui/material";
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../context/authContext"; // Importamos useAuth
import Modal from "./Modal"; 
import "./compartir.css"; 

export default function Share() {
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sharedText, setSharedText] = useState("");
  const [sharedImage, setSharedImage] = useState(null);
  const [posts, setPosts] = useState([]); // Estado para las publicaciones

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

  const handleShare = async () => {
    if (sharedImage || sharedText) {
      const newPost = {
        id: Date.now(), // ID único para cada publicación
        text: sharedText,
        image: sharedImage ? URL.createObjectURL(sharedImage) : null,
        userName: auth.user?.displayName || "Anónimo",
      };
      setPosts([...posts, newPost]);
      setSharedText("");
      setSharedImage(null);
    } else {
      console.log("No se ha seleccionado ninguna foto o texto.");
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
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
      </CardContent>

      {posts.map(post => (
        <Card key={post.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {post.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
          {post.image && (
            <CardMedia
              component="img"
              image={post.image}
              alt="Shared"
              sx={{ maxHeight: 300, borderRadius: 1 }}
            />
          )}
          <IconButton onClick={() => handleDeletePost(post.id)}>
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}

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
