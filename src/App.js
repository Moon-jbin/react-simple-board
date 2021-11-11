import { useEffect, useState } from "react";
import "./App.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "html-react-parser";
import Axios from "axios";

function App() {
  const [movieContent, setMovieContent] = useState({
    title: "",
    content: "",
  });

  const [viewContent, setViewContent] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/get").then((response) => {
      setViewContent(response.data);
    });
  }, [viewContent]);

  const submitReview = () => {
    Axios.post("http://localhost:8000/api/insert", {
      title: movieContent.title,
      content: movieContent.content,
    }).then(() => {
      alert("등록 완료!");
    });
  };

  const getValue = (event) => {
    const { name, value } = event.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
    console.log(movieContent);
  };

  return (
    <div className="App">
      <h1>Movie Review</h1>
      <div className="movie-container">
        {viewContent.map((element) => (
          <div>
            <h2>{element.title}</h2>
            <div>{ReactHtmlParser(element.content)}</div>
          </div>
        ))}
      </div>
      <div className="form-wrap">
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          onChange={getValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieContent({
              ...movieContent,
              content: data,
            });
            console.log(movieContent);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <button className="submit-button" onClick={submitReview}>
        입력
      </button>
    </div>
  );
}

export default App;
