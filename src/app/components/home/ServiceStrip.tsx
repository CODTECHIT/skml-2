import { Zap } from "lucide-react";

export function ServiceStrip() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 pb-8">
      <div className="bg-gradient-to-r from-[#E3F7FB] to-[#F0FBFD] border border-[#B2E5F0] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 bg-[#00B4D8]/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap size={21} className="text-primary" />
          </div>
          <div>
            <p className="font-poppins font-bold text-[#0A2E36] text-base">Mobile Service Available</p>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Display Replacement · Battery Change · Dead Board Recovery
            </p>
          </div>
        </div>
        <button className="border-2 border-primary text-primary font-semibold text-sm px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex-shrink-0 active:scale-95">
          Book Service
        </button>
      </div>
    </section>
  );
}
