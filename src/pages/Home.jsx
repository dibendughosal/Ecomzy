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
  <div className="w-full">
    {
      loading ? <Spinner/> : posts.length > 0 ? (<div className="max-w-7xl min-h-[80vw] mx-auto flex flex-wrap justify-center items-center gap-x-5">
        {
          posts.map(item => (
            <Product key={item.id} item={item}/>
          ))
        }
      </div>) : (<div className="flex justify-center items-center"><p>No Data Found</p></div>)
    }
    <br />
    <footer className="w-full px-10 flex justify-between items-center bg-slate-900 text-white h-[7vw]">
      <h1 className="text-xl font-bold">
        &copy; All rights reserved 
      </h1>
      <p>Made with ❤</p>
    </footer>
  </div>
  );
};

export default Home;
