import { useState } from "react"
import {useNavigate} from "react-router-dom"
const AddBook=()=>{
    const [msg,setMsg]=useState("")
    const [book,setBook]=useState({
        title:'',
        author:'',
        image:'',
    })
    const navigate = useNavigate();
    const AddBooks=async()=>{
        console.log(book);
    if (!book.title || !book.author || !book.image) {
      setMsg("Fill All The Details*");
    } else {
      try {
        const response = await fetch("https://bookapp-14vf.onrender.com/books", {
          method: "POST",
          body: JSON.stringify(book), // Use the 'book' object
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if(response.status===201){
            setMsg("Book added successfully!");
           navigate('/books')
        }else{
            setMsg("Error while adding book");
        }
        // Handle the response, e.g., check for success or error
      } catch (error) {
        console.error("Error adding book:", error);
        setMsg("Error adding the book");
      }
    }
    }
    return(
        <div className="book">
            <div>
                <label>Title:</label>
                <input placeholder="Enter the Book Title" onChange={(e)=>{setBook({...book,title:e.target.value})}}/>
            </div>
            <div>
                <label>Author</label>
                <input placeholder="Enter The Author Name" onChange={(e)=>{setBook({...book,author:e.target.value})}}/>
            </div>
            <div>
                <label>Image URL</label>
                <input placeholder="Enter The Image Url" onChange={(e)=>{setBook({...book,image:e.target.value})}}/>
            </div>
            <button onClick={AddBooks}>Add</button>
            <div className="war">{msg}</div>
        </div>
    )
}
export default AddBook;