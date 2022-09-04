import { Button, Card } from 'flowbite-react';
import { useRouter } from 'next/router'

function Join() {
    const router = useRouter()
    const { orderId } = router.query
  
    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.push("/" )
    }
{/* 
  
    <h3>title</h3>
    <Button>
    Default
  </Button>   */}
    return (
  
<div className="flex h-screen"><div className="m-auto">
  <Card>
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Joe Tiger has started new food order!
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400">
      Your friend Joe has invited you to order food with him. 
  </p>
  <Button onClick={handleSubmit}>
    Join Food Order Session
    <svg
      className="ml-2 -mr-1 h-4 w-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </Button>
</Card>
</div>
</div>
 )

//<>

    {/* <p>Do you want to join in Joe Tiger's Order? {orderId}</p>

    <form onSubmit={handleSubmit}>
    
    <button type="submit" value="Join"> Join</button>
  </form></> */}
  }
  
export default Join