import { useState } from "react"
const AddBook=()=>{
    const [msg,setMsg]=useState("")
    const [book,setBook]=useState({
        title:'',
        author:'',
        image:'',
    })

    const AddBooks=()=>{
        console.log(book)
        if(!book.title||!book.author||!book.image){
            setMsg("Fill All The Details*")
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