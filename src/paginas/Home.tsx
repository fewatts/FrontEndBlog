import './Home.css';
import logoBlog from '/logoBlog.png'

function Home() {
    return (
      <>
        <div className='titulo'> <h1>Home</h1></div>
        <div className='imgdiv'><img src={logoBlog} alt="LogoBlog" className='img'/></div>
    </>
    );
  }  

export default Home;
