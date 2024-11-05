import Background from "~/components/background";
import { EatingCalculator } from "~/components/calculators/eating";
import { ExistingCalculator } from "~/components/calculators/existing";
import { WalkingCalculator } from "~/components/calculators/walking";
import OilIcon from "~/components/icons/oil";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Home() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Background />
      <p className="fixed top-3 left-3 text-muted-foreground/30">Made by Matthew Williams</p>
      <div className="inset-0 absolute z-10 py-16 flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-foreground/90 mb-2 text-center">
          How much <OilIcon className="inline w-12 h-12" /> am I Expending?
        </h1>
        <p className="text-muted-foreground w-[89%] md:w-2/3 max-w-[600px] text-center mb-4">
          You may assume this is a website that tracks your carbon emissions. Well, not quite. For a range of actions, it gives
          you the amount (in millilitres) of oil that is expended/consumed in that action. <b>Note</b>: This is an entirely metric website.
        </p>
        <Tabs defaultValue="existing">
          <TabsList className="flex justify-center">
            <TabsTrigger value="existing">Existing</TabsTrigger>
            <TabsTrigger value="walking">Walking</TabsTrigger>
            <TabsTrigger value="eating">Eating</TabsTrigger>
          </TabsList>
          <TabsContent value="existing">
            <ExistingCalculator />
          </TabsContent>
          <TabsContent value="walking">
            <WalkingCalculator />
          </TabsContent>
          <TabsContent value="eating">
            <EatingCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
