import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {

  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData(){
    setLoading(true);
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    }
    catch(error){
      console.error("Error fetching data:", error);
    }finally{
      setLoading(false);
    }

  }

  useEffect(() => { 
    fetchProductData();
  }, []);

  return (
  <div className="flex justify-center items-center">
    {
      loading ? <Spinner/> : posts.length > 0 ? (<div>
        {
          posts.map(item => (
            <Product key={item.id} item={item}/>
          ))
        }
      </div>) : (<div><p>No Data Found</p></div>)
    }

  </div>
  );
};

export default Home;
