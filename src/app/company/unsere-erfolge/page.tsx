// app/company/unsere-erfolge/page.tsx
"use client";

import { Award, Building2, Users, GraduationCap, Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UnsereErfolgePage() {
  const successStories = [
    {
      company: "Leaders University",
      type: "Partenariat éducatif",
      description: "Partenariat stratégique pour la promotion de programmes d'éducation et d'échange entre la Tunisie et l'Allemagne.",
      icon: Building2,
      stats: [
        { label: "Étudiants placés", value: "150+" },
        { label: "Programmes", value: "12" }
      ]
    },
    {
      company: "Faculté d'Économie, Sousse",
      type: "Coopération académique",
      description: "Collaboration pour le développement de programmes d'études et d'échange pour les étudiants en sciences économiques.",
      icon: GraduationCap,
      stats: [
        { label: "Diplômés", value: "80+" },
        { label: "Projets de coopération", value: "8" }
      ]
    }
  ];

  const testimonials = [
    {
      quote: "La collaboration avec AVS TUNISIA a révolutionné notre stratégie RH. Nous avons trouvé des talents hautement motivés et parfaitement préparés qui se sont intégrés remarquablement bien dans notre équipe.",
      author: "Dr. Michael Weber",
      position: "Directeur Général, Weber Industries GmbH",
      rating: 5
    },
    {
      quote: "AVS TUNISIA comprend parfaitement les besoins des entreprises allemandes. Les candidats sont non seulement formés linguistiquement, mais aussi culturellement préparés à travailler en Allemagne.",
      author: "Sabine Hoffmann",
      position: "Directrice RH, Healthcare Solutions AG",
      rating: 5
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
            <Award className="h-6 w-6 text-[#0a2a88]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Nos Succès</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous sommes fiers des partenariats et projets réussis que nous avons développés au fil des années. 
              Voici quelques-uns de nos plus grands succès.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Partenariats réussis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((story) => (
            <div key={story.company} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
                  <story.icon className="h-5 w-5 text-[#0a2a88]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{story.company}</h4>
                  <span className="text-xs font-medium text-[#0a2a88] bg-[#0a2a88]/10 px-2 py-0.5 rounded-full">
                    {story.type}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{story.description}</p>
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                {story.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-bold text-[#0a2a88]">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ce que disent nos partenaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
              <Quote className="h-8 w-8 text-[#0a2a88]/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Overview */}
      <section className="bg-gradient-to-r from-[#0a2a88] to-[#3b8bc4] rounded-xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-sm text-white/70">Talents placés</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">50+</div>
            <div className="text-sm text-white/70">Entreprises partenaires</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">20+</div>
            <div className="text-sm text-white/70">Secteurs d'activité</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">95%</div>
            <div className="text-sm text-white/70">Taux de réussite</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Devenez notre prochain succès
        </h3>
        <p className="text-gray-600 mb-6">
          Découvrez comment nous pouvons soutenir votre entreprise dans le recrutement de talents.
        </p>
        <Link
          href="/company/kontakt-beratung"
          className="inline-flex items-center gap-2 bg-[#0a2a88] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a2a88]/90 transition-colors"
        >
          Devenir partenaire
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}