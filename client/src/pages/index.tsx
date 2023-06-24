import { SavedItemsDetailsComponent } from "@/components/savedItemsDetails";
import { TotalItemCounter } from "@/components/totalItemsCounter";

function HomePage() {
  return (
    <>
      <div className={'text-lg'}>Welcome to the Home Page!</div>
      <SavedItemsDetailsComponent />
      <TotalItemCounter />
    </>
  );
}

export default HomePage;


