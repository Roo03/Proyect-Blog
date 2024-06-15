import React, { useState } from "react";
import "./modal.css"
import { Button, Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ onClose }) {
  const [comment, setComment] = useState(""); 

  const Comentarios = [
    { username: "Jeremi Merlina", text: "wasaaaaaaaaaaaaaaa" },
    { username: "Tirado Rodriguez", text: "xd" },
    { username: "Daniel Uc", text: "me da 10 pesos de tortilla cuanto va ser" },
    { username: "Aban Pablo", text: "5 pesos de cilantro" },
    { username: "Puch Daniel", text: "vaya porqueria" },
    { username: "Pool Molina", text: "hola amigos del feis" }
  ];

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      
      Comentarios.push({ username: "Usuario", text: comment });
      setComment(""); 
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <Container className="modalContenedor">
        <div className="modalHeader">
          <h3>Comentarios</h3>
          <Button className="closeButton" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div className="modalBody">
          {Comentarios.map((comment, index) => (
            <div key={index} className="modalComment">
              <span className="commentUsername">{comment.username}: </span>
              <span className="commentText">{comment.text}</span>
            </div>
          ))}
        </div>
        </Container>
        <div className="commentInputContainer"> 
          <input
            type="text"
            placeholder="Añadir comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="commentInput"
          />
          <Button className="addCommentButton" onClick={handleAddComment}>Añadir comentario</Button>
        </div>
      </div>
    </div>
  );
}
