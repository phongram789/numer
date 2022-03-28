import axios from "axios";
import React from "react";
const baseURL = "http://localhost:5000/api/Bisection";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  let X = post.xR
  let cal = X*X

  return (
    <div>
      <h1>{post.id}</h1>
      <h1>{cal}</h1>
      
    </div>
  );
}