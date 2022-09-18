import { Button, Card } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

function Start() {
  const router = useRouter();
  const [name, setName] = useState("Meera");
  const [error, setError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.length === 0) {
      setError(true);
      return;
    }

    router.push({
      pathname: "/order",
      query: {
        name: name,
      },
    });
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Start a New Food Order with your friends
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            You can order food online with your friends.
          </p>

          <form>
            <label className="pb-10">
              Name:
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </label>
            <div className="pt-10">
              {error && (
                <div className="text-orange-600	"> Enter Your Name </div>
              )}
              <Button onClick={handleSubmit}>
                Start New Order
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
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Start;
