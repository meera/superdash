import Image from 'next/image'

interface AvatarProps {
  user: string;
}
function Avatar({ user }: AvatarProps) {
  return (
    <div className="flex flex-col justify-center px-10">
      <div className="w-40 h-40 relative"> 
      <Image
        height="150px"
        width="150px"
        src="/meera_profile.jpeg"
        alt="A persons Avatar"
        className="flex-none  object-center object-cover bg-gray-200 rounded-full border-4 border-blue-100"
      />
      </div>
      <h2 className="text-center text-gray-700 text-md font-bold pt-4">
        {user}
      </h2>
    </div>
  );
}

export default Avatar;
