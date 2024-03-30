import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'

export default function App() {

  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      console.log(data.products);
      setData(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  }

  const handlePrev = () => {
    if (page === 1) return page;
    setPage(page - 1);
  }

  useEffect(() => {
    getData();
  }, [page])

  useEffect(() => {
    const pageDataCount = Math.ceil(data.length / 5);
    setPageCount(pageDataCount);

    if (page) {
      const limit = 5;
      const skip = limit * page;
      const dataSkip = data.slice(page === 1 ? 0 : skip - limit, skip);
      setPageData(dataSkip);
    }
  }, [data])

  return (
    <>
      <Navbar />
      <div className="container-full">

        {
          pageData.length > 0 ? <div className="table-box">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Image</th>
                </tr>
              </thead>
              <tbody>

                {
                  pageData.map((item) => {
                    return (
                      <tr key={item.id} >
                        <th scope="row">{item.id}</th>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td><img style={{ width: "70px", height: "70px", objectFit: "contain" }} src={item.thumbnail} alt="" /></td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li style={{cursor:"pointer"}} className={`"page-item" ${page === 1 ? "disabled" : null} `}>
                  <a className="page-link" onClick={handlePrev}>Previous</a>
                </li>

                {
                  Array(pageCount).fill(null).map((item, index) => {
                    return (
                      <li key={index}  style={{cursor:"pointer"}} onClick={() => setPage(index + 1)} className={`"page-item" ${page === index + 1 ? "active" : null} `}> <a className="page-link">{index + 1}</a> </li>
                    )
                  })
                }

                <li  style={{cursor:"pointer"}} className={`"page-item" ${page === pageCount ? "disabled" : null} `}>
                  <a className="page-link" onClick={handleNext}>Next</a>
                </li>
              </ul>
            </nav>


          </div>
            : <div className='loading-full'>
              <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
        }

      </div>
    </>
  )
}