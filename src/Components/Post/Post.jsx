import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import Modal from "./Modal"; 
import { Button, Typography } from "@mui/material";
import { useAuth } from "../context/authContext";

export default function Post({ post }) {
  const [showModal, setShowModal] = useState(false); 
  const auth = useAuth();
  const { displayName } = auth.user;
  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Typography className="postUsername">{displayName && <h5> {displayName}</h5>}</Typography>
          </div>
        </div>
        <div className="postBody">
          <div className="postLeft">
            <div className="postCenter">
            <span className="postText">ola amigos del feis, aqui en mi uni</span>
              <img
                src="/img/UTM.jpg" 
                className="postImg"
                alt="Post"
              />
            </div>
          </div>
          <div className="postRight">
            <div className="postComments">

              <Button className="postCommentButton" onClick={handleOpenModal}>
                Ver comentarios
              </Button>

              {showModal && <Modal onClose={() => setShowModal(false)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
