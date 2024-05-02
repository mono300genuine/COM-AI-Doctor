
const HowitWorks = () => {
  return (
    <div
      id="works"
      className="flex justify-center gap-7 mb-24 items-center flex-col"
    >
      <h2 className="text-center text-3xl font-bold text-secondary-foreground">
        How It Works
      </h2>
      <section className="flex md:flex-row flex-col justify-between gap-7">
        <div className="bg-[#ecf5fe] w-full rounded-sm border p-4 flex flex-col gap-3">
          <h3 className="text-primary font-semibold text-lg">Step 1:</h3>
          <span className="text-secondary-foreground">
            Click get started and wait for Com Doctor AI to start your consultation.
          </span>
          <span className="text-yellow-600 text-sm">
            Disclaimer: Com Doctor AI may provide inaccurate responses and is not
            meant to replace a doctor. Should only be used for symptom analysis.
          </span>
        </div>
        <div className="bg-[#ecf5fe] w-full  rounded-sm border p-4 flex flex-col gap-3">
          <h3 className="text-primary font-semibold text-lg">Step 2:</h3>
          <span className="text-secondary-foreground">
            Com Doctor AI uses OPENAI Chat Completion software to answer your medical
            concerns and provide analysis and treatments based on the accuracy
            of your responses.
          </span>
        </div>
        <div className="bg-[#ecf5fe] w-full  rounded-sm border p-4 flex flex-col gap-3">
          <h3 className="text-primary font-semibold text-lg">Step 3:</h3>
          <span className="text-secondary-foreground">
            Once you are done, your current consultation chat will be added to a
            history list where you can access it again and continue the
            consultation if needed.
          </span>
        </div>
      </section>
    </div>
  );
};

export default HowitWorks;
