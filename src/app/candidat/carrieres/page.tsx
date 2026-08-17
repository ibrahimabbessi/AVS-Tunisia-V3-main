import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        



<header className="relative pt-section-gap-md pb-section-gap-lg px-margin-mobile md:px-gutter max-w-container-max mx-auto">
<div className="flex flex-col md:flex-row items-center gap-gutter">
<div className="md:w-1/2 z-10">
<h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-6">A Smart way to Reach the right Career in Germany</h1>
<p className="font-body-lg text-on-surface-variant mb-8 max-w-xl">Discover premium Ausbildung opportunities and professional roles tailored for top-tier candidates. Filter, find, and secure your future globally.</p>

<div className="glass-panel rounded-xl p-2 flex items-center shadow-lg w-full max-w-md">
<span className="material-symbols-outlined text-outline ml-3">search</span>
<input className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder-outline-variant font-body-md mx-3" placeholder="Search job title or keyword..." type="text"/>
<button className="bg-primary-container text-white px-6 py-3 rounded-lg font-label-md hover:bg-primary-container/90 transition-colors whitespace-nowrap">Find Job</button>
</div>
</div>
<div className="md:w-1/2 relative mt-12 md:mt-0">
<div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
<img alt="Professional" className="relative z-10 w-full object-cover rounded-2xl shadow-2xl h-[500px]" data-alt="A confident, smartly dressed young professional standing against a modern, bright office background, looking directly at the camera with a subtle smile. The lighting is high-key and professional, embodying global opportunity and success." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATeUf3sfeXP5V4LdN5VX3MPdUrGfo1_on99TRMAwBwWgx1k4S5y7_ZTu7DIlZcTzu2IxTdmd4bj2mJZ1RGpwuURtZ5Sktpe2r-BO2hiFMHja2UqxVGDwFl4e15KBZe-x2gyjlEgfLp1ZbFn2LwcrQOkNwKA8YADaFP0ik055xj4_whVY6IB7DZck6f05NmjJCK7JnhkxoleL238J6evYSBjpFaYRLlu_tCf_WOTuLMxWJKA4OyFdrLEw"/>

<div className="absolute -left-8 top-1/4 glass-panel p-4 rounded-xl shadow-xl z-20 hidden md:block border-t border-white/40">
<div className="flex items-center gap-3">
<div className="bg-surface-container-high p-2 rounded-full">
<span className="material-symbols-outlined text-secondary">trending_up</span>
</div>
<div>
<p className="font-label-md text-primary">High Demand</p>
<p className="font-caption text-on-surface-variant">Nursing &amp; Tech</p>
</div>
</div>
</div>
</div>
</div>
</header>

<main className="bg-surface-container-lowest py-section-gap-md px-margin-mobile md:px-gutter">
<div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-4 gap-gutter">

<aside className="lg:col-span-1 space-y-8">
<div className="glass-panel p-6 rounded-2xl">
<h3 className="font-headline-md text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">tune</span> Filters
                    </h3>
<div className="space-y-6">

<div>
<h4 className="font-label-md text-on-surface mb-3">Sector</h4>
<div className="space-y-2">
<label className="flex items-center gap-2 cursor-pointer group">
<input className="form-checkbox rounded text-secondary border-outline-variant focus:ring-secondary" type="checkbox"/>
<span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">Healthcare &amp; Nursing</span>
</label>
<label className="flex items-center gap-2 cursor-pointer group">
<input className="form-checkbox rounded text-secondary border-outline-variant focus:ring-secondary" type="checkbox"/>
<span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">Information Technology</span>
</label>
<label className="flex items-center gap-2 cursor-pointer group">
<input className="form-checkbox rounded text-secondary border-outline-variant focus:ring-secondary" type="checkbox"/>
<span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">Engineering</span>
</label>
<label className="flex items-center gap-2 cursor-pointer group">
<input className="form-checkbox rounded text-secondary border-outline-variant focus:ring-secondary" type="checkbox"/>
<span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">Hospitality</span>
</label>
</div>
</div>

<div>
<h4 className="font-label-md text-on-surface mb-3">Location (Germany)</h4>
<select className="form-select w-full rounded-lg border-outline-variant bg-surface-lowest text-on-surface focus:ring-secondary focus:border-secondary font-body-md">
<option>All Locations</option>
<option>Berlin</option>
<option>Munich</option>
<option>Frankfurt</option>
<option>Hamburg</option>
</select>
</div>

<div>
<h4 className="font-label-md text-on-surface mb-3">German Level Required</h4>
<div className="flex flex-wrap gap-2">
<button className="px-3 py-1 rounded-full border border-outline-variant font-caption text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors">A2</button>
<button className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary font-caption text-secondary">B1</button>
<button className="px-3 py-1 rounded-full border border-outline-variant font-caption text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors">B2</button>
<button className="px-3 py-1 rounded-full border border-outline-variant font-caption text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors">C1</button>
</div>
</div>
</div>
</div>
</aside>

<div className="lg:col-span-3 space-y-6">
<div className="flex justify-between items-center mb-4">
<p className="font-body-md text-on-surface-variant">Showing <span className="font-bold text-primary">24</span> professional opportunities</p>
<select className="form-select border-none bg-transparent text-secondary font-label-md cursor-pointer hover:bg-surface-container-low rounded-lg py-1">
<option>Sort by: Most Relevant</option>
<option>Newest</option>
</select>
</div>

<div className="glass-panel p-6 rounded-2xl hover:border-secondary transition-colors duration-300 group ambient-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
<div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/30">
<span className="material-symbols-outlined text-3xl text-primary-container">medical_services</span>
</div>
<div className="flex-grow">
<div className="flex flex-wrap gap-2 mb-2">
<span className="px-2 py-1 bg-[#ade8f4] text-[#03045e] rounded-full font-caption uppercase tracking-wider">Ausbildung</span>
<span className="px-2 py-1 bg-surface-container-highest text-on-surface rounded-full font-caption flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Munich</span>
</div>
<h3 className="font-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">Registered Nurse (Pflegefachkraft)</h3>
<p className="font-body-md text-on-surface-variant line-clamp-2">Join a leading clinical facility in Munich. Comprehensive Ausbildung program with intensive language support and guaranteed placement upon completion.</p>
<div className="flex items-center gap-4 mt-4 text-on-surface-variant font-caption">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">language</span> B1 German Req.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">euro</span> Competitive Stipend</span>
</div>
</div>
<div className="shrink-0 w-full md:w-auto mt-4 md:mt-0 flex flex-col items-end gap-3">
<button className="w-full md:w-auto bg-primary-container text-white px-6 py-2 rounded-lg font-label-md hover:bg-primary-container/90 transition-colors">Apply Now</button>
<button className="text-secondary font-label-md hover:underline flex items-center gap-1">Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span></button>
</div>
</div>

<div className="glass-panel p-6 rounded-2xl hover:border-secondary transition-colors duration-300 group ambient-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
<div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/30">
<span className="material-symbols-outlined text-3xl text-primary-container">engineering</span>
</div>
<div className="flex-grow">
<div className="flex flex-wrap gap-2 mb-2">
<span className="px-2 py-1 bg-[#ade8f4] text-[#03045e] rounded-full font-caption uppercase tracking-wider">Direct Hire</span>
<span className="px-2 py-1 bg-surface-container-highest text-on-surface rounded-full font-caption flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Berlin</span>
</div>
<h3 className="font-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">Mechatronics Engineer</h3>
<p className="font-body-md text-on-surface-variant line-clamp-2">Looking for experienced engineers for advanced automation systems. We facilitate visa processing and relocation assistance.</p>
<div className="flex items-center gap-4 mt-4 text-on-surface-variant font-caption">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">language</span> B2 German Req.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work</span> 3+ Years Exp.</span>
</div>
</div>
<div className="shrink-0 w-full md:w-auto mt-4 md:mt-0 flex flex-col items-end gap-3">
<button className="w-full md:w-auto bg-primary-container text-white px-6 py-2 rounded-lg font-label-md hover:bg-primary-container/90 transition-colors">Apply Now</button>
<button className="text-secondary font-label-md hover:underline flex items-center gap-1">Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span></button>
</div>
</div>

<div className="glass-panel p-6 rounded-2xl hover:border-secondary transition-colors duration-300 group ambient-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
<div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 border border-outline-variant/30">
<span className="material-symbols-outlined text-3xl text-primary-container">restaurant</span>
</div>
<div className="flex-grow">
<div className="flex flex-wrap gap-2 mb-2">
<span className="px-2 py-1 bg-[#ade8f4] text-[#03045e] rounded-full font-caption uppercase tracking-wider">Ausbildung</span>
<span className="px-2 py-1 bg-surface-container-highest text-on-surface rounded-full font-caption flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Frankfurt</span>
</div>
<h3 className="font-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">Hospitality Management (Hotelfachmann/frau)</h3>
<p className="font-body-md text-on-surface-variant line-clamp-2">Start your international career in premium hospitality. Dual training program with a renowned international hotel chain.</p>
<div className="flex items-center gap-4 mt-4 text-on-surface-variant font-caption">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">language</span> A2 German Req.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">school</span> High School Dip.</span>
</div>
</div>
<div className="shrink-0 w-full md:w-auto mt-4 md:mt-0 flex flex-col items-end gap-3">
<button className="w-full md:w-auto bg-primary-container text-white px-6 py-2 rounded-lg font-label-md hover:bg-primary-container/90 transition-colors">Apply Now</button>
<button className="text-secondary font-label-md hover:underline flex items-center gap-1">Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span></button>
</div>
</div>

<div className="flex justify-center mt-8 space-x-2">
<button className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"><span className="material-symbols-outlined">chevron_left</span></button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary text-white font-label-md">1</button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary font-label-md">2</button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary font-label-md">3</button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>
</main>



      </div>
      <Footer />
    </>
  );
}
