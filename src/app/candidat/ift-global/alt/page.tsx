import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        



<section className="pt-32 pb-section-gap-md px-margin-mobile md:px-gutter max-w-container-max mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div className="space-y-8 z-10">
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ade8f4] text-[#03045e] font-label-md text-caption uppercase tracking-wide">
<span className="material-symbols-outlined text-[16px]">business_center</span>
                    Corporate Staffing Solutions
                </div>
<h1 className="font-display-lg-mobile md:font-display-lg text-primary">Strategic Talent Acquisition for the DACH Region</h1>
<p className="font-body-lg text-on-surface-variant max-w-xl">
                    We bridge the gap between highly qualified international professionals and German enterprises, managing the entire lifecycle from recruitment to seamless integration.
                </p>
<div className="flex flex-col sm:flex-row gap-4">
<a className="btn-primary px-8 py-4 rounded-lg font-label-md text-center glass-highlight flex justify-center items-center gap-2" href="#">
                        For Employers
                        <span className="material-symbols-outlined">arrow_forward</span>
</a>
<a className="px-8 py-4 rounded-lg font-label-md text-center border-2 border-[#0096c7] text-[#0096c7] hover:bg-[#0096c7]/5 transition-colors" href="#">
                        For Candidates
                    </a>
</div>
</div>
<div className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden glass-panel ambient-shadow">
<img className="w-full h-full object-cover rounded-xl p-2" data-alt="A sophisticated corporate business meeting in a modern glass-walled office in Berlin. Professional executives reviewing documents on a large sleek table. Bright, natural lighting reflecting off modern architectural surfaces. High-end, trustworthy, corporate atmosphere with a palette of deep blues and crisp whites." src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"/>
</div>
</div>
</section>

<section className="py-section-gap-md bg-surface-container-low px-margin-mobile md:px-gutter">
<div className="max-w-container-max mx-auto space-y-12">
<div className="text-center space-y-4 max-w-2xl mx-auto">
<h2 className="font-headline-lg text-primary">End-to-End Employer Solutions</h2>
<p className="font-body-md text-on-surface-variant">Streamlined processes designed to mitigate friction in international hiring, ensuring compliance and speed.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="glass-panel p-8 rounded-2xl card-hover flex flex-col gap-4">
<div className="w-12 h-12 rounded-lg bg-[#0096c7]/10 flex items-center justify-center text-[#0096c7] mb-2">
<span className="material-symbols-outlined text-[28px]">person_search</span>
</div>
<h3 className="font-headline-md text-primary">Targeted Recruitment</h3>
<p className="font-body-md text-on-surface-variant flex-grow">Access a curated pool of pre-vetted professionals in nursing, engineering, and IT, meticulously matched to your requirements.</p>
</div>

<div className="glass-panel p-8 rounded-2xl card-hover flex flex-col gap-4">
<div className="w-12 h-12 rounded-lg bg-[#0096c7]/10 flex items-center justify-center text-[#0096c7] mb-2">
<span className="material-symbols-outlined text-[28px]">verified</span>
</div>
<h3 className="font-headline-md text-primary">Credential Recognition</h3>
<p className="font-body-md text-on-surface-variant flex-grow">We navigate the complex German Anerkennungsprozess (recognition process), ensuring all foreign qualifications meet state standards.</p>
</div>

<div className="glass-panel p-8 rounded-2xl card-hover flex flex-col gap-4">
<div className="w-12 h-12 rounded-lg bg-[#0096c7]/10 flex items-center justify-center text-[#0096c7] mb-2">
<span className="material-symbols-outlined text-[28px]">flight_takeoff</span>
</div>
<h3 className="font-headline-md text-primary">Visa &amp; Relocation</h3>
<p className="font-body-md text-on-surface-variant flex-grow">Comprehensive support for work visas (Fast-Track), travel arrangements, and initial settlement in Germany for a smooth transition.</p>
</div>
</div>
</div>
</section>

<section className="py-section-gap-lg px-margin-mobile md:px-gutter max-w-container-max mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div className="relative h-[600px] w-full rounded-2xl overflow-hidden glass-panel ambient-shadow hidden lg:block">
<img className="w-full h-full object-cover rounded-xl p-2" data-alt="A focused professional consultant in a modern, light-filled office analyzing a strategic roadmap on a transparent glass board. Elegant, minimalistic corporate aesthetic with crisp whites, deep navy blues, and subtle cyan accents. High-quality corporate photography emphasizing precision and clarity." src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"/>
</div>
<div className="space-y-10">
<div className="space-y-4">
<h2 className="font-headline-lg text-primary"></h2></div></div></div></section>
      </div>
      <Footer />
    </>
  );
}
