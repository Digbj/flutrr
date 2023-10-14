import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
// import Comments from "./comments";
const Books=()=>{
    const { info } = useContext(UserContext);
    console.log(info.name ,"am i visible")
    const [book,setBook]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const navigate = useNavigate(); 

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await fetch('http://localhost:8000/book');
                if(!response.ok){
                    console.log("could not fetch data from DB")
                }
                const data=await response.json();
                setBook(data);
            }catch(error){
                console.log(error,"error")
            }
        }
        fetchData()
    },[])
   
    console.log(book)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = book.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(book.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const toCommentsPage = (data) => {
        if (info) {
          const allData = {
            _id: data._id,
            title: data.title,
            author: data.author,
            image: data.image,
          };
      console.log(data)
          navigate(`/comments/${data._id}`, { state: { cardDetails: allData } });

        } else {
          console.log("Not authorized");
        }
      };
      
      
    
    
    return(
        <div className="book-page">
           <div className="abc"></div>
           <h3>The Digital Library</h3>
           <div className="card1">
            {
                currentBooks?.map((data,index)=>{
                    return(<div key={data._id} className="card" onClick={()=>{toCommentsPage(data)}}>
                        <h5>{data.title}</h5>
                        <div className="img"> <img src={data.image} alt="pic"/></div>
                        <h5>{data.author}</h5>
                    </div>)
                })
            }
             
           </div>
   <div className="page">
                <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <span className="pages">{currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
          
        </div>
    )
}
export default Books;


