import React, { useEffect, useState } from 'react'

function books() {
    const [data, setData] = useState({
        title: "",
        author: "",
        quantity: 0,
      });
    
      const [dataarray, setDataarray] = useState([]);
      const [refresh, setRefresh] = useState(1);
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        fetch("http://localhost:8080/books", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("data:", data);
            handleRefresh()
          })
          .catch((error) => {
            console.error(" error!", error);
          });
       
      };
    
      const handleInput = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]:
            name === "quantity" ? parseInt(value, 10) : value,
        });
      };
    
      const handleDelete = (id) => {
        fetch(`http://localhost:8080/books/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              return res.text().then((text) => {
                throw new Error(
                  `HTTP error! Status: ${res.status}. Message: ${text}`
                );
              });
            }
            console.log("Book deleted successfully");
            handleRefresh()
          })
          .catch((error) => {
            console.error("error!", error);
          });
    
         
      };
      const handleRefresh = () => {
        setRefresh((pre) => pre + 1);
        console.log(refresh);
      };
    
      useEffect(() => {
        fetch("http://localhost:8080/books")
          .then((res) => res.json())
          .then((value) => {
            console.log(value);
            setDataarray(value);
          })
          .catch((err) => console.log(err));
      }, [refresh]);
  return (
     <>
      <div className="flex">
        <div className="left">
          <form action="" method="post" onSubmit={handleSubmit}>
           
            <div className="field">
              <label htmlFor="">Author:</label>
              <input type="text" name="author" id="" onChange={handleInput} required/>
            </div>
            <div className="field">
              <label htmlFor="">Title:</label>
              <input type="text" name="title" id="" onChange={handleInput} required/>
            </div>
            <div className="field">
              <label htmlFor="">Quantity:</label>
              <input
                type="number"
                name="quantity"
                id=""
                onChange={handleInput}
                required
              />
            </div>
            <div className="field">
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
        <div className="data right">
        <div  className="table-heading">
                <div className="">ID</div>
                <div className="">Title</div>
                <div className="">Author</div>
                <div className="">Quantity</div>
                <div className=""></div>
              </div>
          {dataarray.map((data, key) => {
            return (
              <div key={key} className="table-field">
                <div className="">{data.id}</div>
                <div className="">{data.title}</div>
                <div className="">{data.author}</div>
                <div className="">{data.quantity}</div>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default books