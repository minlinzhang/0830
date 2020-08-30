import React, { useState, useEffect,useMemo } from 'react';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const [dropdown,setDropdown] = useState(false);  
  
  const sortedItems = useMemo(() => {
    console.log(items);
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig] > b[sortConfig]) {
          return sortConfig.direction === "descending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;

  }, [items, sortConfig]);



  const requestSort = (key) => {
 
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setDropdown(!dropdown)
  };
  return { items: sortedItems, requestSort, sortConfig };
};




const Posts = ({ posts, loading}) => {
  const {items, requestSort, sortConfig,dropdown} = useSortableData(posts);

  const getClassNameFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

 
  return (
    <div>
    <table >
      <tr>
        <th> Project ID
      {!dropdown === false && 
       <button   onClick={() => requestSort("phone")}
                className={getClassNameFor("phone")} ><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>
       </button>}

          {!dropdown === true && 
           <button   onClick={() => requestSort("phone")}
           className={getClassNameFor("phone")} ><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
  </button>
          
          }
        </th>
        <th>Scrum Team
        {!dropdown === false && 
       <button   onClick={() => requestSort("phone")}
                className={getClassNameFor("phone")} ><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>
       </button>}

          {!dropdown === true && 
           <button   onClick={() => requestSort("phone")}
           className={getClassNameFor("phone")} ><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
  </button>
          
          }
        </th>
        <th>
          Domain
          {!dropdown === false && 
       <button   onClick={() => requestSort("phone")}
                className={getClassNameFor("phone")} >
       </button>}

          {!dropdown === true && 
           <button   onClick={() => requestSort("phone")}
           className={getClassNameFor("phone")} ><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
  </button>
          
          }
        </th>
      </tr>
      <tbody>
        {items.map((post) => (
          <tr  key={post.id} >
            <td>{post.phone}</td>
            <td>{post.name}</td>
            <td>{post.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
      
  )
}







const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <Posts posts={currentPosts} loading={loading}  
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
