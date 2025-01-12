import Navbar from "@/components/navbar";
import GenerateWallet from "@/components/generateWallet";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-black via-[#0F1A2B] to-black text-white overflow-hidden">
      <Navbar />
      <GenerateWallet />
    </div>
  );
}
