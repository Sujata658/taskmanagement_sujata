
const FallbackUI = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <p className='text-3xl font-bold'>You sure It's our Fault???</p>
      {
        
      }
     <a href='/'>
         <button className="bg-webthemeprim text-foreground font-bold py-2 px-4 rounded" >
        Go to HomePage
      </button>
      </a>
    </div>
  );
};

// const FallbackUI = () => (
//   <div>
//       <h1>Something went wrong.</h1>
//       <button onClick={() => window.history.back()}>Go Back</button>
//   </div>
// );

// export default FallbackUI;


export default FallbackUI;
