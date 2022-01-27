import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPostScreen = () => {
  const [genreArr, setGenreArr] = useState([]);

  const [genreList, setGenreList] = useState([
    { id: "61f0132429cbf76c5b4c7ebf", text: "Adult Fiction" },
    { id: "61f0133329cbf76c5b4c7ec0", text: "Horror" },
    { id: "61f0133f29cbf76c5b4c7ec1", text: "Fiction" },
    { id: "61f0134629cbf76c5b4c7ec2", text: "Fantasy" },
    { id: "61f0134d29cbf76c5b4c7ec3", text: "Mystery" },
    { id: "61f0135529cbf76c5b4c7ec4", text: "Politics" },
    { id: "61f0135c29cbf76c5b4c7ec5", text: "Science Fiction" },
    { id: "61f0136329cbf76c5b4c7ec6", text: "Thriller" },
    { id: "61f0136b29cbf76c5b4c7ec7", text: "War" },
    { id: "61f0137329cbf76c5b4c7ec8", text: "Art" },
    { id: "61f0137929cbf76c5b4c7ec9", text: "Biography" },
    { id: "61f0138029cbf76c5b4c7eca", text: "Business" },
    { id: "61f0138829cbf76c5b4c7ecb", text: "Classics" },
    { id: "61f0138f29cbf76c5b4c7ecc", text: "Comics" },
    { id: "61f0139529cbf76c5b4c7ecd", text: "Contemporary" },
    { id: "61f013a029cbf76c5b4c7ece", text: "Cookbooks" },
    { id: "61f013a629cbf76c5b4c7ecf", text: "Crime" },
    { id: "61f013ad29cbf76c5b4c7ed0", text: "History" },
    { id: "61f013b629cbf76c5b4c7ed1", text: "Humor and Comedy" },
    { id: "61f013c129cbf76c5b4c7ed2", text: "Memoir" },
  ]);
  const navigate = useNavigate();
  const alert = useAlert();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    bookTitle: "",
    author: "",
    genre: "",
  });
  const handleGenre = (e) => {
    console.log(e.target.value);
    setGenreArr([
      ...genreArr,
      {
        id: e.target.value,
        text: genreList.filter((genre) => genre.id == e.target.value)[0].text,
      },
    ]);
    console.log(genreArr);
    setGenreList(genreList.filter((genre) => genre.id !== e.target.value));
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  const addPost = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const post = await axios.post(
        "/api/add_post",
        {
          title: formData.title,
          desc: formData.desc,
          bookTitle: formData.bookTitle,
          author: formData.author,
          genre: genreArr,
        },
        config
      );
      if (post.status === 201) {
        alert.show("Post Added Successfuly", { type: "success" });
      }
    } catch (err) {
      const msg = err.response ? err.response.data.message : err;
      alert.show(msg, { type: "error" });
    }
  };
  return (
    <div id="mt">
      <h3 className="text-center">Add new Post</h3>
      <Form className="w-75 m-auto text-center" onSubmit={addPost}>
        <Form.Group className="my-2" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="content">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            placeholder="Enter Description"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="booktitle">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Title"
            value={formData.bookTitle}
            onChange={(e) =>
              setFormData({ ...formData, bookTitle: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="title">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author's name"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
        </Form.Group>
        {genreArr.length > 0
          ? genreArr.map((genre) => {
              return (
                <Alert key={genre.id} variant="primary">
                  {genre.text}
                </Alert>
              );
            })
          : null}
        <Form.Group controlId="genre">
          <Form.Label>Select Book Genre</Form.Label>
          <Form.Select aria-label="genre" onChange={(e) => handleGenre(e)}>
            <option value="">Select your Option</option>
            {genreList.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.text}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddPostScreen;
