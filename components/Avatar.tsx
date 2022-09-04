interface AvatarProps {
  user: string;
  setUser: Function;
}
function Avatar({ user, setUser }: AvatarProps) {
  return (
    <div className="flex flex-col justify-center px-10">
      <img
        src="https://i.pravatar.cc/200?img=12"
        alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
        className="flex-none w-40px h-40px object-center object-cover bg-gray-200 rounded-full border-4 border-purple-100"
      />
      <h2 className="text-center text-gray-700 text-md font-bold pt-4">
        {user}
      </h2>
    </div>
  );
}

export default Avatar;
