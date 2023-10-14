import { useEffect, useState } from "react";

const Books=()=>{
    const [book,setBook]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

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
    
    return(
        <div className="book-page">
           <div className="abc"></div>
           <h3>The Digital Library</h3>
           <div className="card1">
            {
                currentBooks?.map((data,index)=>{
                    return(<div key={data._id} className="card">
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


