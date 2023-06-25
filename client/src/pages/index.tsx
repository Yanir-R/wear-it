import { SavedItemsDetailsComponent } from "@/components/savedItemsDetails";
import { TotalItemCounter } from "@/components/totalItemsCounter";
function HomePage() {
  return (
    <div className=" px-2 ">
      <div className='flex items-center justify-between my-2'>
        <h2 className='font-mono  border-sky-200 text-cyan-600  border-solid'>Home Page</h2>
      </div>
      <div className="py-6">
        <TotalItemCounter />
        <SavedItemsDetailsComponent />
      </div>
    </div>
  );
}

export default HomePage;


