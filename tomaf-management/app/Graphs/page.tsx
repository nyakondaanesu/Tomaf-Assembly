import MobileBottomNav from "../Home/components/bottomNav";
import { GraphBar } from "./[components]/graphBar";
import Navbar from "./[components]/navbar";
import PieChartCard from "./[components]/pieChart";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-950 w-full text-white  pb-16">
      <div className="">
        <Navbar />
      </div>
      <div className="flex justify-center items-center gap-6 flex-wrap mt-6">
        <PieChartCard />
        <GraphBar />
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default page;
