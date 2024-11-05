import Link from "next/link";

export default function Navbar(){
    return <nav className="p-[6px] text-sm text-primary-light flex justify-between">
        <div className="ml-[15px]">
            <Link href={"#"} className="mr-[5px] p-[5px] font-[500]">About</Link>
            <Link href={"#"} className="mr-[5px] p-[5px]">Store</Link>
        </div>
    </nav>
}