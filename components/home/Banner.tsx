import GeneratePlanButton from "@/components/GeneratePlanButton";
import {Lightbulb} from "lucide-react";
import TravelHero from "@/components/home/TravelHero";

const Banner = () => {
  return (
    <section
      className="lg:px-20 px-5 py-2 
                bg-background
                w-full h-full
                flex lg:flex-row flex-col lg:justify-between justify-center items-center
                gap-5
                min-h-[calc(100svh-4rem)]"
    >
      <article className="flex flex-col h-full justify-center items-center lg:flex-1 ">
        <h1
          className="font-bold lg:text-7xl md:text-5xl text-4xl font-sans
      text-left w-full"
        >
          Uncover the <br /> <span className="text-yellow-500">AI</span> Travel{" "}
          <span className="text-yellow-500">Plan</span>
        </h1>

        <div className="mt-5 lg:mt-10 rounded-md w-full text-left lg:text-lg md:text-md text-base">
          <div className="flex justify-start  items-center">
            <Lightbulb className="mr-1 text-yellow-600" />
            <span className="text-center ">Imagine telling your travel planner,</span>
          </div>
          <div className="p-2">
            <p className="text-yellow-500 font-bold tracking-wide lg:text-md md:text-base text-sm">
              'A summer weekend getaway to a lively city, <br className="lg:hidden" />
              perfect for a mid-range budget.'
            </p>
            <p
              className="mt-5 mb-5 
                        lg:text-md md:text-base text-sm
                      text-muted-foreground
                        font-medium
                        tracking-wide
                        md:max-w-xl 
                        text-left"
            >
              Our AI goes beyond understanding – it creates a personalized journey tailored to you. Uncover hidden gems, indulge in local cuisine, and explore renowned landmarks with a custom itinerary built around your unique preferences.
            </p>
          </div>
        </div>
        <div className="w-full ml-2 flex justify-start">
          <GeneratePlanButton />
        </div>
      </article>
      <figure className="h-full lg:flex-1 flex-1 overflow-hidden">
        <TravelHero />
      </figure>
    </section>
  );
};

export default Banner;
