import axios from "axios";
import React from "react";
const baseURL = "http://localhost:5000/api/Onepoint";

function cal(x){
  
  let result = (1/2)-x;
  return result;
}

function One_pst(X){
  let X1 = X;
  let Xs = cal(X1);
for(var i = 0 ; i<10000;i++){
  if((X1-Xs)/X1 > 0.000001){
    return X1
    
  }
  else{
          X1 = Xs;
          Xs = cal(X1);

  }
}
}


export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);
  if (!post) return null;

  var X = post.x0;

  return (
    <div>
      <h1>{post.id}</h1>
      <h1>{X}</h1>
      <h1>{One_pst(X)}</h1>
    </div>
  );
}

