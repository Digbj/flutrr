import { UserContext } from "../context/userContext";
import { useContext, useState,useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const Comments = () => {
  const { info } = useContext(UserContext);
//   console.log(info.name);
const [msg,setMsg]=useState('')
const [commentData,setCommetData]=useState([])
  const location = useLocation();
  const cardDetails = location.state.cardDetails;
  const { _id, title, author, image } = cardDetails;
  const commentId=_id;
//   console.log(cardDetails.id);
  const [review, setReview] = useState({
    id: _id, // Use cardDetails._id as the id
    name: info.name,
    rating: "",
    comments: "",
  });

  const Handle=async()=>{
    console.log(review)
    if(!review.rating||!review.comments){
setMsg("fill the Review")
    }else if(parseInt(review.rating) < 1 || parseInt(review.rating) > 5){
        setMsg("Rate in between 1-5");
    }else{
        
        try {
            const response = await fetch('http://localhost:8000/comments', {
              method: 'POST',
              body: JSON.stringify(review),
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
      
            if (response.status === 201) {
              setMsg('Comment added successfully!');
            } else {
              setMsg('Error while adding the comment');
            }
          } catch (error) {
            console.error('Error adding comment:', error);
            setMsg('Error adding the comment');
          }
    }
    console.log(review)
  }

  useEffect(() => {
    const fetchCommentById = async () => {
      try {
        const response = await fetch(`your-server-url/comments/${commentId}`);
        if (response.ok) {
          const data = await response.json();
          setCommetData(data);
        } else {
          setMsg('Comment not found');
        }
      } catch (error) {
        console.error('Error fetching comment by ID:', error);
        setMsg('Server error');
      }
    };

    fetchCommentById();
  }, [commentId]);
console.log(review)
  return (
    <div className="revew">
      <div className="no"></div>
      <div className="card2">
        <h5>Title: {title}</h5>
        <h5>Author: {author}</h5>
        <img className="img1" src={image} alt="pic" />
      </div>
      <h3>Add Review</h3>
      <div>
        <div>
          <input
            placeholder="Rating in 1-5"
            onChange={(e) => {
              setReview({ ...review, rating: e.target.value });
            }}
          />
          <input
            placeholder="Comments"
            onChange={(e) => {
              setReview({ ...review, comments: e.target.value });
            }}
          />
          <button onClick={Handle}>Submit</button>
          <div>{msg}</div>
        </div>
        <div>comments</div>
        {
            commentData?.map((data)=>{
                return<div>
                    <label>{data.name}</label>
                    <p>{data.comment}</p>
                </div>
            })
        }
      </div>
    </div>
  );
};

export default Comments;


