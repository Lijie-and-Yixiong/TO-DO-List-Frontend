import Image from 'next/image';
export default function ButtonList(){
    return(
        <div className="card-actions justify-end mr-5 mb-2 p-2">
        <button className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/add.png"
                width={20}
                height={20}
                alt="Add pic"
                />
            </button>
            <button className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/bin.png"
                width={20}
                height={20}
                alt="Bin pic"
                />
            </button>
            <button className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/pen.png"
                width={20}
                height={20}
                alt="Pen pic"
                />
            </button>
        </div>
    )
}